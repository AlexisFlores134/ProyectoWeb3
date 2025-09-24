<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h2 class="text-center mb-4">Gestión de Usuarios</h2>
      
      <div class="row mb-4">
        <div class="col-md-4 mb-3" v-for="user in users" :key="user.id">
          <div class="card-custom user-card text-center p-4">
            <div class="user-avatar mb-3">
              <i class="fas fa-user-circle fa-3x" style="color: #4fc3f7;"></i>
            </div>
            <h4>{{ user.nombre }}</h4>
            <p class="text-light">{{ user.rol }}</p>
            <div class="d-flex justify-content-center gap-2">
              <button class="btn btn-sm btn-primary">Editar</button>
              <button class="btn btn-sm btn-danger">Eliminar</button>
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
                <input type="text" class="form-control glass-effect" v-model="newUser.nombre">
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label class="form-label">Correo electrónico</label>
                <input type="email" class="form-control glass-effect" v-model="newUser.email">
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
                <input type="password" class="form-control glass-effect" v-model="newUser.password">
              </div>
            </div>
          </div>
          <button class="btn btn-primary" @click="addUser">Agregar Usuario</button>
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
      }
    }
  },
  async mounted() {
    await this.loadUsers()
  },
  methods: {
    async loadUsers() {
      try {
        const response = await usersAPI.getAll()
        this.users = response.data
      } catch (error) {
        console.error('Error loading users:', error)
      }
    },
    async addUser() {
      try {
        await usersAPI.create(this.newUser)
        await this.loadUsers()
        this.newUser = { nombre: '', email: '', rol: 'usuario', password: '' }
      } catch (error) {
        console.error('Error adding user:', error)
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
</style>