<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h2 class="text-center mb-4" style="color: white;">Historial de Accesos</h2>
      
      <div class="card-custom">
        <div class="card-header">
          <h5 class="mb-0"><i class="fas fa-history me-2"></i>Registros de Acceso</h5>
        </div>
        <div class="card-body">
          <div class="row mb-3">
            <div class="col-md-8"> <div class="input-group">
                <span class="input-group-text glass-effect">Desde:</span>
                <input type="date" class="form-control glass-effect" v-model="startDate">
                <span class="input-group-text glass-effect">Hasta:</span>
                <input type="date" class="form-control glass-effect" v-model="endDate">
                <button class="btn btn-primary" @click="filterHistory" :disabled="loading">
                  <span v-if="loadingFilter" class="spinner-border spinner-border-sm me-1"></span>
                  Filtrar
                </button>
              </div>
            </div>
            </div>

          <div v-if="loading && !loadingFilter" class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-2">Cargando historial...</p>
          </div>

          <div v-else-if="error" class="alert alert-danger">
            {{ error }}
          </div>

          <div v-else class="table-responsive">
            <table class="table table-hover">
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
      loadingFilter: false, // Estado de carga específico para el botón
      error: null,
      polling: null // Variable para guardar el intervalo
    }
  },
  async mounted() {
    await this.loadHistory(true); // Carga inicial
    
    // --- NUEVO: Polling cada 5 segundos ---
    // Inicia el sondeo para buscar nuevos registros
    this.polling = setInterval(() => {
      this.loadHistory(false); // Las cargas de sondeo no muestran el spinner grande
    }, 5000); // 5000ms = 5 segundos
  },
  unmounted() {
    // --- NUEVO: Limpiar el intervalo ---
    // Detenemos el sondeo cuando el usuario abandona la página
    // para evitar fugas de memoria.
    clearInterval(this.polling);
  },
  methods: {
    async loadHistory(showFullLoading = false) {
      if (!showFullLoading && !this.loadingFilter) {
        // Si es una carga de polling, no mostramos el spinner principal
      } else {
        this.loading = true;
      }
      this.error = null;
      
      try {
        const params = {}
        // La lógica de filtros que tenías es correcta
        if (this.startDate) params.start_date = this.startDate
        if (this.endDate) params.end_date = this.endDate
        
        const response = await accessAPI.getHistory(params)
        this.accessHistory = response.data.data || response.data
      } catch (error) {
        console.error('Error loading history:', error)
        this.error = 'Error al cargar el historial. Por favor, intenta nuevamente.'
        clearInterval(this.polling); // Detener el sondeo si hay un error
      } finally {
        this.loading = false;
        this.loadingFilter = false;
      }
    },
    async filterHistory() {
      this.loadingFilter = true;
      await this.loadHistory(true); // Llama a la carga con 'showFullLoading'
    },
   formatDate(dateString) {
    if (!dateString) return 'N/A';

    // 1. Le decimos a new Date() que la fecha de entrada es UTC.
    //    (Asumiendo que dateString es "2025-11-12 20:35:11")
    const date = new Date(dateString + ' UTC'); 

    // 2. toLocaleString() la convertirá automáticamente 
    //    a la zona horaria local del navegador del usuario.
    return date.toLocaleString('es-ES');
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