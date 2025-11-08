<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h2 class="text-center mb-4">Gestión de Tarjetas RFID</h2>
      
      <!-- Estado de carga -->
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-2">Cargando tarjetas...</p>
      </div>

      <!-- Mensaje de error -->
      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <!-- Contenido principal -->
      <div v-else class="card-custom">
        <div class="card-header">
          <h5 class="mb-0"><i class="fas fa-id-card me-2"></i>Tarjetas Registradas</h5>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Estado</th>
                  <th>Fecha Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="card in cards" :key="card.id">
                  <td>{{ card.uid }}</td>
                  <td>{{ card.usuario?.nombre || 'No asignado' }}</td>
                  <td>
                    <span class="status-badge" :class="card.activa ? 'status-active' : 'status-inactive'">
                      {{ card.activa ? 'Activa' : 'Inactiva' }}
                    </span>
                  </td>
                  <td>{{ formatDate(card.fecha_registro) }}</td>
                  <td>
                    <button 
                      class="btn btn-sm" 
                      :class="card.activa ? 'btn-warning' : 'btn-success'"
                      @click="toggleCardStatus(card.id)"
                      :disabled="loadingToggle"
                    >
                      <span v-if="loadingToggle === card.id" class="spinner-border spinner-border-sm me-1"></span>
                      {{ card.activa ? 'Desactivar' : 'Activar' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="cards.length === 0" class="text-center py-4">
              <p class="text-muted">No hay tarjetas registradas</p>
            </div>
          </div>
          <button class="btn btn-primary mt-3">
            <i class="fas fa-plus me-1"></i> Agregar Nueva Tarjeta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Layout/Navbar.vue'
import { cardsAPI } from '@/services/api'

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
      error: null
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
        this.cards = response.data.data || response.data
      } catch (error) {
        console.error('Error loading cards:', error)
        this.error = 'Error al cargar las tarjetas. Por favor, intenta nuevamente.'
      } finally {
        this.loading = false
      }
    },
    async toggleCardStatus(cardId) {
      this.loadingToggle = cardId
      try {
        await cardsAPI.toggleStatus(cardId)
        await this.loadCards() // Recargar la lista
        this.$toast.success('Estado de tarjeta actualizado correctamente')
      } catch (error) {
        console.error('Error toggling card status:', error)
        this.$toast.error('Error al cambiar el estado de la tarjeta')
      } finally {
        this.loadingToggle = null
      }
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString('es-ES')
    }
  }
}
</script>

<style scoped>
.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
}

.status-active {
  background: #00c853;
}

.status-inactive {
  background: #ff1744;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>