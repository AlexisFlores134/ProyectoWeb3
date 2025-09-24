<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h2 class="text-center mb-4">Gestión de Tarjetas RFID</h2>
      
      <div class="card-custom">
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
                  <td>{{ card.usuario_nombre }}</td>
                  <td>
                    <span class="status-badge" :class="card.activa ? 'status-active' : 'status-inactive'">
                      {{ card.activa ? 'Activa' : 'Inactiva' }}
                    </span>
                  </td>
                  <td>{{ formatDate(card.fecha_registro) }}</td>
                  <td>
                    <button 
                      class="btn btn-sm" 
                      :class="card.activa ? 'btn-danger' : 'btn-success'"
                      @click="toggleCardStatus(card.id)"
                    >
                      {{ card.activa ? 'Desactivar' : 'Activar' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button class="btn btn-primary mt-2">
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
      cards: []
    }
  },
  async mounted() {
    await this.loadCards()
  },
  methods: {
    async loadCards() {
      try {
        const response = await cardsAPI.getAll()
        this.cards = response.data
      } catch (error) {
        console.error('Error loading cards:', error)
      }
    },
    async toggleCardStatus(cardId) {
      try {
        await cardsAPI.toggleStatus(cardId)
        await this.loadCards() // Recargar la lista
      } catch (error) {
        console.error('Error toggling card status:', error)
      }
    },
    formatDate(dateString) {
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
}

.status-active {
  background: #00c853;
}

.status-inactive {
  background: #ff1744;
}
</style>