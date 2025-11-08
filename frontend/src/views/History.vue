<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h2 class="text-center mb-4">Historial de Accesos</h2>
      
      <div class="card-custom">
        <div class="card-header">
          <h5 class="mb-0"><i class="fas fa-history me-2"></i>Registros de Acceso</h5>
        </div>
        <div class="card-body">
          <!-- Filtros -->
          <div class="row mb-3">
            <div class="col-md-6">
              <div class="input-group">
                <input type="date" class="form-control glass-effect" v-model="startDate">
                <input type="date" class="form-control glass-effect" v-model="endDate">
                <button class="btn btn-primary" @click="filterHistory" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-1"></span>
                  Filtrar
                </button>
              </div>
            </div>
            <div class="col-md-6 text-end">
              <button class="btn btn-outline-light" :disabled="accessHistory.length === 0">
                <i class="fas fa-download me-1"></i> Exportar
              </button>
            </div>
          </div>

          <!-- Estado de carga -->
          <div v-if="loading" class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-2">Cargando historial...</p>
          </div>

          <!-- Mensaje de error -->
          <div v-else-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <!-- Tabla -->
          <div v-else class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Fecha/Hora</th>
                  <th>Tarjeta</th>
                  <th>Usuario</th>
                  <th>Ubicación</th>
                  <th>Resultado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="access in accessHistory" :key="access.id">
                  <td>{{ formatDate(access.fecha_acceso) }}</td>
                  <td>{{ access.tarjeta_rfid?.uid || 'N/A' }}</td>
                  <td>{{ access.tarjeta_rfid?.usuario?.nombre || 'N/A' }}</td>
                  <td>{{ access.ubicacion }}</td>
                  <td :class="access.acceso_permitido ? 'access-granted' : 'access-denied'">
                    {{ access.acceso_permitido ? 'Permitido' : 'Denegado' }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="accessHistory.length === 0" class="text-center py-4">
              <p class="text-muted">No hay registros de acceso</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Layout/Navbar.vue'
import { accessAPI } from '@/services/api'

export default {
  name: 'History',
  components: {
    Navbar
  },
  data() {
    return {
      accessHistory: [],
      startDate: '',
      endDate: '',
      loading: false,
      error: null
    }
  },
  async mounted() {
    await this.loadHistory()
  },
  methods: {
    async loadHistory() {
      this.loading = true
      this.error = null
      try {
        const params = {}
        if (this.startDate) params.start_date = this.startDate
        if (this.endDate) params.end_date = this.endDate
        
        const response = await accessAPI.getHistory(params)
        this.accessHistory = response.data.data || response.data
      } catch (error) {
        console.error('Error loading history:', error)
        this.error = 'Error al cargar el historial. Por favor, intenta nuevamente.'
      } finally {
        this.loading = false
      }
    },
    async filterHistory() {
      await this.loadHistory()
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleString('es-ES')
    }
  }
}
</script>

<style scoped>
.access-granted {
  color: #00e676;
  font-weight: 600;
}

.access-denied {
  color: #ff5252;
  font-weight: 600;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>