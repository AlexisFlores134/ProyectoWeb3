<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="page-title">Gestión de Tarjetas RFID</h2>
        <button 
          class="btn btn-primary btn-add"
          @click="openAddModal"
        >
          <i class="fas fa-plus me-2"></i>Nueva Tarjeta
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-3 text-light">Cargando tarjetas...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="alert alert-danger">
        <i class="fas fa-exclamation-triangle me-2"></i>
        {{ error }}
      </div>

      <!-- Main Content -->
      <div v-else>
        <!-- Cards Grid -->
        <div class="row g-4 mb-5">
          <div class="col-12">
            <div class="section-header">
              <h4 class="section-title">
                <i class="fas fa-id-card me-2"></i>
                Tarjetas Registradas
                <span class="badge bg-primary ms-2">{{ cards.length }}</span>
              </h4>
            </div>
          </div>
          
          <div 
            v-for="card in cards" 
            :key="card.id" 
            class="col-xl-4 col-lg-6 col-md-6"
          >
            <div class="card-custom card-hover">
              <div class="card-header-custom">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="card-uid">
                    <i class="fas fa-credit-card me-2"></i>
                    {{ card.uid }}
                  </div>
                  <span 
                    class="status-badge" 
                    :class="card.activa ? 'status-active' : 'status-inactive'"
                  >
                    {{ card.activa ? 'Activa' : 'Inactiva' }}
                  </span>
                </div>
              </div>
              
              <div class="card-body-custom">
                <div class="user-info mb-3">
                  <div class="user-avatar">
                    <i class="fas fa-user"></i>
                  </div>
                  <div class="user-details">
                    <h6 class="user-name">{{ card.usuario?.nombre || 'No asignado' }}</h6>
                    <p class="user-email">
                      {{ card.usuario?.email || 'Sin usuario asignado' }}
                    </p>
                  </div>
                </div>
                
                <div class="card-meta">
                  <div class="meta-item">
                    <i class="fas fa-calendar me-2"></i>
                    <small>Registrada: {{ formatDate(card.fecha_registro) }}</small>
                  </div>
                </div>
              </div>
              
              <div class="card-footer-custom">
                <div class="btn-group-actions">
                  <button 
                    class="btn btn-action btn-toggle"
                    :class="card.activa ? 'btn-warning' : 'btn-success'"
                    @click="toggleCardStatus(card)"
                    :disabled="loadingToggle === card.id"
                    :title="card.activa ? 'Desactivar' : 'Activar'"
                  >
                    <span v-if="loadingToggle === card.id" class="spinner-border spinner-border-sm"></span>
                    <i v-else class="fas" :class="card.activa ? 'fa-toggle-on' : 'fa-toggle-off'"></i>
                  </button>
                  
                  <button 
                    class="btn btn-action btn-edit"
                    @click="openEditModal(card)"
                    title="Editar Usuario" 
                  >
                    <i class="fas fa-edit"></i>
                  </button>

                  <button 
                    class="btn btn-action btn-delete"
                    @click="confirmDelete(card)"
                    title="Eliminar Tarjeta"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="cards.length === 0" class="empty-state text-center py-5">
          <div class="empty-icon mb-3">
            <i class="fas fa-id-card fa-3x text-muted"></i>
          </div>
          <h5 class="text-light mb-2">No hay tarjetas registradas</h5>
          <p class="text-muted">Comienza agregando tu primera tarjeta RFID</p>
          <button class="btn btn-primary mt-3" @click="openAddModal">
            <i class="fas fa-plus me-2"></i>Agregar Primera Tarjeta
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para Agregar Tarjeta -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content-custom">
          <div class="modal-header-custom">
            <h5 class="modal-title">
              <i class="fas fa-plus-circle me-2"></i>
              Agregar Nueva Tarjeta
            </h5>
            <button type="button" class="btn-close-custom" @click="closeAddModal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body-custom">
            <div class="form-group">
              <label class="form-label">UID de la Tarjeta</label>
              <input 
                type="text" 
                class="form-control-custom" 
                v-model="newCard.uid"
                required
                placeholder="Ingrese el UID de la tarjeta RFID"
              >
              <div class="form-hint">El UID es único para cada tarjeta</div>
            </div>
            <div class="form-group">
              <label class="form-label">Asignar a Usuario</label>
              <select 
                class="form-select-custom" 
                v-model="newCard.usuario_id"
              >
                <option :value="null">Seleccionar usuario...</option>
                <option 
                  v-for="user in userList" 
                  :key="user.id" 
                  :value="user.id"
                >
                  {{ user.nombre }} - {{ user.email }}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer-custom">
            <button type="button" class="btn btn-secondary-custom" @click="closeAddModal">
              Cancelar
            </button>
            <button 
              type="button" 
              class="btn btn-primary-custom" 
              @click="handleAddNewCard"
              :disabled="loadingAddCard || !newCard.uid"
            >
              <span v-if="loadingAddCard" class="spinner-border spinner-border-sm me-2"></span>
              <i class="fas fa-save me-2"></i>
              {{ loadingAddCard ? 'Guardando...' : 'Guardar Tarjeta' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para Editar Tarjeta -->
    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content-custom">
          <div class="modal-header-custom">
            <h5 class="modal-title">
              <i class="fas fa-edit me-2"></i>
              Editar Tarjeta
            </h5>
            <button type="button" class="btn-close-custom" @click="closeEditModal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body-custom" v-if="editingCard">
            <div class="form-group">
              <label class="form-label">UID de la Tarjeta</label>
              <input 
                type="text" 
                class="form-control-custom" 
                :value="editingCard.uid"
                disabled
              >
              <div class="form-hint">El UID no se puede modificar</div>
            </div>
            <div class="form-group">
              <label class="form-label">Asignar a Usuario</label>
              <select 
                class="form-select-custom" 
                v-model="editingCard.usuario_id"
              >
                <option :value="null">Sin usuario asignado</option>
                <option 
                  v-for="user in userList" 
                  :key="user.id" 
                  :value="user.id"
                >
                  {{ user.nombre }} - {{ user.email }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Estado Actual</label>
              <div class="status-display">
                <span class="status-badge" :class="editingCard.activa ? 'status-active' : 'status-inactive'">
                  {{ editingCard.activa ? 'Activa' : 'Inactiva' }}
                </span>
              </div>
            </div>
          </div>
          <div class="modal-footer-custom">
            <button type="button" class="btn btn-secondary-custom" @click="closeEditModal">
              Cancelar
            </button>
            <button 
              type="button" 
              class="btn btn-primary-custom" 
              @click="handleUpdateCard"
              :disabled="!editingCard"
            >
              <i class="fas fa-save me-2"></i>
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmación para Eliminar -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content-custom">
          <div class="modal-header-custom">
            <h5 class="modal-title text-danger">
              <i class="fas fa-exclamation-triangle me-2"></i>
              Confirmar Eliminación
            </h5>
            <button type="button" class="btn-close-custom" @click="closeDeleteModal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body-custom">
            <div class="delete-warning">
              <i class="fas fa-trash fa-2x text-danger mb-3"></i>
              <h6 class="text-light mb-2">¿Estás seguro de que quieres eliminar esta tarjeta?</h6>
              <p class="text-light">Tarjeta: <strong>{{ cardToDelete?.uid }}</strong></p>
              <p class="text-danger small">
                <i class="fas fa-info-circle me-1"></i>
                Esta acción es irreversible y no se puede deshacer.
              </p>
            </div>
          </div>
          <div class="modal-footer-custom">
            <button type="button" class="btn btn-secondary-custom" @click="closeDeleteModal">
              <i class="fas fa-times me-2"></i>
              Cancelar
            </button>
            <button 
              type="button" 
              class="btn btn-danger-custom" 
              @click="handleDeleteCard"
            >
              <i class="fas fa-trash me-2"></i>
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
import { cardsAPI, usersAPI } from '@/services/api'

export default {
  name: 'Cards',
  components: {
    Navbar
  },
  data() {
    return {
      cards: [],
      loading: false,
      loadingToggle: null,
      error: null,
      
      // Estados para controlar modales
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false,
      
      // Datos para Modales
      userList: [], 
      loadingUsers: false,
      loadingAddCard: false,
      newCard: {
        uid: '',
        usuario_id: null
      },
      editingCard: null,
      cardToDelete: null
    }
  },
  async mounted() {
    await this.loadCards()
  },
  methods: {
    async loadCards() {
      this.loading = true
      this.error = null
      try {
        const response = await cardsAPI.getAll()
        this.cards = response.data 
      } catch (error) {
        console.error('Error loading cards:', error)
        this.error = 'Error al cargar las tarjetas. Por favor, intenta nuevamente.'
      } finally {
        this.loading = false
      }
    },

    async toggleCardStatus(card) {
      this.loadingToggle = card.id;
      try {
        await cardsAPI.update(card.id, { activa: !card.activa });
        await this.loadCards(); 
      } catch (error) {
        console.error('Error toggling card status:', error);
        alert('Error al cambiar el estado de la tarjeta');
      } finally {
        this.loadingToggle = null;
      }
    },
    
    formatDate(dateString) {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString('es-ES')
    },

    // Métodos para el modal de Agregar
    async openAddModal() {
      this.newCard = { uid: '', usuario_id: null };
      this.showAddModal = true;
      await this.loadUserList();
    },

    closeAddModal() {
      this.showAddModal = false;
      this.newCard = { uid: '', usuario_id: null };
    },

    // Métodos para el modal de Editar
    async openEditModal(card) {
      this.editingCard = { 
        ...card, 
        usuario_id: card.usuario?.id || null 
      };
      this.showEditModal = true;
      await this.loadUserList();
    },

    closeEditModal() {
      this.showEditModal = false;
      this.editingCard = null;
    },

    // Métodos para el modal de Eliminar
    confirmDelete(card) {
      this.cardToDelete = card;
      this.showDeleteModal = true;
    },

    closeDeleteModal() {
      this.showDeleteModal = false;
      this.cardToDelete = null;
    },

    async loadUserList() {
      this.loadingUsers = true;
      try {
        const response = await usersAPI.getAll(); 
        this.userList = response.data;
      } catch (error) {
        console.error('Error loading users for modal:', error);
        alert('No se pudieron cargar los usuarios');
      } finally {
        this.loadingUsers = false;
      }
    },

    async handleAddNewCard() {
      this.loadingAddCard = true;

      try {
        await cardsAPI.create(this.newCard);
        await this.loadCards(); 
        this.closeAddModal();
      } catch (error) {
        console.error('Error adding new card:', error);
        alert('Error al agregar la tarjeta. ¿UID duplicado?');
      } finally {
        this.loadingAddCard = false;
      }
    },

    async handleUpdateCard() {
      if (!this.editingCard) return;

      try {
        const updateData = {
          usuario_id: this.editingCard.usuario_id
        };
        await cardsAPI.update(this.editingCard.id, updateData);
        await this.loadCards();
        this.closeEditModal();
      } catch (error) {
        console.error('Error updating card:', error);
        alert('Error al actualizar la tarjeta');
      }
    },

    async handleDeleteCard() {
      if (!this.cardToDelete) return;

      try {
        await cardsAPI.delete(this.cardToDelete.id);
        await this.loadCards();
        this.closeDeleteModal();
      } catch (error) {
        console.error('Error deleting card:', error);
        alert('Error al eliminar la tarjeta.');
      }
    }
  }
}
</script>

<style scoped>
/* Layout Styles */
.main-container {
  padding: 2rem 0;
}

.page-title {
  color: white;
  font-weight: 600;
  margin: 0;
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-title {
  color: white;
  font-size: 1.25rem;
  font-weight: 500;
  display: flex;
  align-items: center;
}

/* Card Styles */
.card-custom {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  color: white;
  transition: all 0.3s ease;
  overflow: hidden;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
}

.card-header-custom {
  padding: 1.25rem 1.5rem 0;
  border-bottom: none;
}

.card-body-custom {
  padding: 1.5rem;
}

.card-footer-custom {
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Card UID */
.card-uid {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #4fc3f7;
  font-weight: 500;
}

/* User Info */
.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: rgba(79, 195, 247, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4fc3f7;
}

.user-details {
  flex: 1;
}

.user-name {
  color: white;
  font-weight: 500;
  margin: 0;
  font-size: 1rem;
}

.user-email {
  color: white;
  opacity: 0.8;
  margin: 0;
  font-size: 0.85rem;
}

/* Card Meta */
.card-meta {
  margin-top: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
}

/* Status Badges */
.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-active {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.status-inactive {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  border: 1px solid rgba(244, 67, 54, 0.3);
}

/* Button Styles */
.btn-add {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  padding: 10px 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-group-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.btn-action {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.btn-action:hover {
  transform: scale(1.1);
}

.btn-toggle {
  background: rgba(255, 193, 7, 0.1);
  color: #ffc107;
}

.btn-edit {
  background: rgba(33, 150, 243, 0.1);
  color: #2196f3;
}

.btn-delete {
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
}

/* Empty State */
.empty-state {
  padding: 4rem 2rem;
}

.empty-icon {
  opacity: 0.5;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 1rem;
}

.modal-container {
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content-custom {
  background: rgba(30, 30, 40, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  color: white;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.modal-header-custom {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: between;
}

.modal-title {
  color: white;
  font-weight: 600;
  margin: 0;
  flex: 1;
}

.btn-close-custom {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
}

.btn-close-custom:hover {
  color: white;
}

.modal-body-custom {
  padding: 2rem;
}

.modal-footer-custom {
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

/* Form Styles */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  color: white;
  font-weight: 500;
  margin-bottom: 8px;
  display: block;
}

.form-control-custom,
.form-select-custom {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  padding: 12px 16px;
  width: 100%;
  transition: all 0.3s ease;
}

.form-control-custom:focus,
.form-select-custom:focus {
  outline: none;
  border-color: #4fc3f7;
  box-shadow: 0 0 0 3px rgba(79, 195, 247, 0.1);
}

.form-control-custom:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-hint {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 6px;
}

/* Button Variants */
.btn-primary-custom {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary-custom:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-secondary-custom {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 12px 24px;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-secondary-custom:hover {
  background: rgba(255, 255, 255, 0.15);
}

.btn-danger-custom {
  background: linear-gradient(135deg, #f44336 0%, #e53935 100%);
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-danger-custom:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(244, 67, 54, 0.4);
}

/* Delete Warning */
.delete-warning {
  text-align: center;
  padding: 1rem 0;
}

/* Select Options Styling */
.form-select-custom option {
  background: #1e1e28;
  color: white;
  padding: 10px;
}

/* Responsive */
@media (max-width: 768px) {
  .main-container {
    padding: 1rem 0;
  }
  
  .modal-container {
    margin: 1rem;
    max-width: none;
  }
  
  .modal-header-custom,
  .modal-body-custom,
  .modal-footer-custom {
    padding: 1.25rem;
  }
  
  .btn-group-actions {
    justify-content: center;
  }
}

/* Disabled States */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}
</style>