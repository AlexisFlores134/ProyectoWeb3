<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h2 class="text-center mb-4" style="color: white;">Gestión de Usuarios</h2>

      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-2 text-light">Cargando usuarios...</p>
      </div>

      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div v-else>
        <div class="row mb-4">
          <div class="col-md-4 mb-3" v-for="user in users" :key="user.id">
            <div class="card-custom user-card text-center p-4">
              
              <div class="user-avatar mb-3">
                <i class="fas fa-user-circle fa-3x" style="color: #4fc3f7;"></i>
              </div>

              <h4 class="text-light">{{ user.nombre }}</h4>
              
              <p class="text-light">{{ user.rol === 'admin' ? 'Administrador' : 'Usuario' }}</p>
              
              <p class="text-light small">{{ user.email }}</p>

              <div class="d-flex justify-content-center gap-2 mt-3">
                <button 
                  class="btn btn-sm btn-primary" 
                  @click="openEditModal(user)"
                >
                  Editar
                </button>
                <button 
                  class="btn btn-sm btn-danger" 
                  @click="confirmDelete(user)"
                  :disabled="user.id === currentUserId"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card-custom">
          <div class="card-header">
            <h5 class="mb-0"><i class="fas fa-plus-circle me-2"></i>Agregar Nuevo Usuario</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Nombre completo</label>
                  <input type="text" class="form-control glass-effect" v-model="newUser.nombre" required>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Correo electrónico</label>
                  <input type="email" class="form-control glass-effect" v-model="newUser.email" required>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Rol de usuario</label>
                  <select class="form-select glass-effect" v-model="newUser.rol">
                    <option value="admin">Administrador</option>
                    <option value="usuario">Usuario</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Contraseña</label>
                  <input type="password" class="form-control glass-effect" v-model="newUser.password" required>
                </div>
              </div>
            </div>
            <button class="btn btn-primary" @click="addUser" :disabled="!isFormValid || addingUser">
              <span v-if="addingUser" class="spinner-border spinner-border-sm me-1"></span>
              Agregar Usuario
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para Editar Usuario -->
    <div v-if="showEditModal" class="modal fade show" style="display: block; background-color: rgba(0,0,0,0.5)">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content card-custom">
          <div class="modal-header">
            <h5 class="modal-title">Editar Usuario</h5>
            <button type="button" class="btn-close btn-close-white" @click="closeEditModal"></button>
          </div>
          <div class="modal-body" v-if="editingUser">
            <div class="mb-3">
              <label class="form-label">Nombre completo</label>
              <input type="text" class="form-control glass-effect" v-model="editingUser.nombre" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Correo electrónico</label>
              <input type="email" class="form-control glass-effect" v-model="editingUser.email" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Rol de usuario</label>
              <select class="form-select glass-effect" v-model="editingUser.rol">
                <option value="admin">Administrador</option>
                <option value="usuario">Usuario</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Nueva Contraseña</label>
              <input type="password" class="form-control glass-effect" v-model="editingUser.password">
              <div class="form-text text-light">Dejar en blanco para no cambiar la contraseña.</div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeEditModal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="handleUpdateUser">Guardar Cambios</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmación para Eliminar -->
    <div v-if="showDeleteModal" class="modal fade show" style="display: block; background-color: rgba(0,0,0,0.5)">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content card-custom">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar Eliminación</h5>
            <button type="button" class="btn-close btn-close-white" @click="closeDeleteModal"></button>
          </div>
          <div class="modal-body">
            <p class="text-light">¿Estás seguro de que quieres eliminar al usuario <strong>{{ userToDelete?.nombre }}</strong>?</p>
            <p class="text-danger">Esta acción es irreversible y no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDeleteModal">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="handleDeleteUser">
              Sí, Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Navbar from '@/components/Layout/Navbar.vue'
import { usersAPI } from '@/services/api'

export default {
  name: 'Users',
  components: {
    Navbar
  },
  data() {
    return {
      users: [],
      newUser: {
        nombre: '',
        email: '',
        rol: 'usuario',
        password: ''
      },
      editingUser: null,
      userToDelete: null,
      loading: false,
      addingUser: false,
      error: null,
      currentUserId: 1,
      // Estados para controlar modales
      showEditModal: false,
      showDeleteModal: false
    }
  },
  computed: {
    isFormValid() {
      return this.newUser.nombre && 
             this.newUser.email && 
             this.newUser.password &&
             this.newUser.rol
    }
  },
  async mounted() {
    await this.loadUsers()
  },
  methods: {
    async loadUsers() {
      this.loading = true
      this.error = null
      try {
        const response = await usersAPI.getAll()
        
        this.users = response.data 
        
        if (!Array.isArray(this.users)) {
            console.warn("La respuesta de /usuarios no es un array:", this.users);
            this.error = "Error: La respuesta del servidor no tiene el formato esperado (se esperaba un array de usuarios)."
            this.users = []
        }

      } catch (error) {
        console.error('Error completo al CARGAR usuarios:', error.response || error)
        if (error.response && error.response.data && error.response.data.message) {
           this.error = `Error al cargar usuarios: ${error.response.data.message}`
        } else {
           this.error = 'Error al cargar los usuarios. Revisa la consola y el log de Laravel.'
        }
      } finally {
        this.loading = false
      }
    },

    async addUser() {
      this.addingUser = true
      try {
        await usersAPI.create(this.newUser)
        await this.loadUsers()
        this.newUser = { nombre: '', email: '', rol: 'usuario', password: '' }
        alert('Usuario agregado correctamente') 
      } catch (error) {
        this.addingUser = false 
        console.error('Error completo al AGREGAR usuario:', error)
        if (error.response && error.response.status === 422) {
          let errorMessages = Object.values(error.response.data.errors).flat().join('. ');
          alert('Error al agregar: ' + errorMessages) 
        } else {
          alert('Error al agregar el usuario. Revisa la consola.')
        }
      } finally {
        this.addingUser = false
      }
    },

    // Métodos para el modal de Editar
    openEditModal(user) {
      this.editingUser = { ...user, password: '' }
      this.showEditModal = true
    },

    closeEditModal() {
      this.showEditModal = false
      this.editingUser = null
    },

    async handleUpdateUser() {
      if (!this.editingUser) return

      try {
        const updateData = { ...this.editingUser }
        if (!updateData.password || updateData.password.trim() === '') {
          delete updateData.password
        }
        await usersAPI.update(this.editingUser.id, updateData)
        await this.loadUsers()
        alert('Usuario actualizado correctamente')
        this.closeEditModal()
      } catch (error) {
        console.error('Error completo al ACTUALIZAR:', error)
        if (error.response && error.response.status === 422) {
          let errorMessages = Object.values(error.response.data.errors).flat().join('. ')
          alert('Error al actualizar: ' + errorMessages)
        } else {
          alert('Error al actualizar el usuario')
        }
      }
    },

    // Métodos para el modal de Eliminar
    confirmDelete(user) {
      this.userToDelete = user
      this.showDeleteModal = true
    },

    closeDeleteModal() {
      this.showDeleteModal = false
      this.userToDelete = null
    },

    async handleDeleteUser() {
      if (!this.userToDelete) return

      try {
        await usersAPI.delete(this.userToDelete.id)
        await this.loadUsers()
        alert('Usuario eliminado correctamente')
        this.closeDeleteModal()
      } catch (error) {
        console.error('Error completo al ELIMINAR:', error.response || error)
        alert('Error al eliminar el usuario. Revisa la consola.')
      }
    }
  }
}
</script>

<style scoped>
.user-card {
  transition: all 0.3s ease;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Estilos para modales personalizados */
.modal-content {
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 12px;
}

.modal-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.modal-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.btn-close {
  background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;
}

.btn-close-white {
  background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e") center/1em auto no-repeat;
}
</style>