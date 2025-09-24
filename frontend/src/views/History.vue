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
          <div class="row mb-3">
            <div class="col-md-6">
              <div class="input-group">
                <input type="date" class="form-control glass-effect" v-model="startDate">
                <input type="date" class="form-control glass-effect" v-model="endDate">
                <button class="btn btn-primary" @click="filterHistory">Filtrar</button>
              </div>
            </div>
            <div class="col-md-6 text-end">
              <button class="btn btn-outline-light">
                <i class="fas fa-download me-1"></i> Exportar
              </button>
            </div>
          </div>
          
          <div class="table-responsive">
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
                  <td>{{ access.tarjeta_uid }}</td>
                  <td>{{ access.usuario_nombre }}</td>
                  <td>{{ access.ubicacion }}</td>
                  <td :class="access.acceso_permitido ? 'access-granted' : 'access-denied'">
                    {{ access.acceso_permitido ? 'Permitido' : 'Denegado' }}
                  </td>
                </tr>
              </tbody>
            </table>
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
      loading: false
    }
  },
  async mounted() {
    await this.loadHistory()
  },
  methods: {
    async loadHistory() {
      this.loading = true
      try {
        const response = await accessAPI.getHistory()
        this.accessHistory = response.data
      } catch (error) {
        console.error('Error loading history:', error)
      } finally {
        this.loading = false
      }
    },
    async filterHistory() {
      await this.loadHistory()
    },
    formatDate(dateString) {
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
</style>