<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h2 class="text-center mb-4" style="color: white;">Dashboard</h2>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-2">Cargando datos del dashboard...</p>
      </div>

      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div v-else>
        <div class="row">
          
          <div class="col-lg-7 mb-4">
            <div class="card-custom h-100">
              <div class="card-body">
                <h5 class="card-title text-center mb-3">Estadísticas de Acceso</h5>
                <div style="height: 350px;">
                  <canvas ref="pieChart" v-if="!loading && !error"></canvas>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-5 mb-4">
            <div class="card-custom h-100">
              <div class="card-body">
                <h5 class="card-title text-center mb-3">Últimos 5 Accesos</h5>
                <div v-if="recentAccess.length === 0" class="text-center text-muted py-3">
                  No hay accesos recientes.
                </div>
                <ul v-else class="list-group list-group-flush">
                  <li v-for="access in recentAccess" :key="access.id" class="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{{ access.tarjeta_rfid?.usuario?.nombre || 'N/A' }}</strong>
                      <small class="d-block text-muted">{{ formatDate(access.fecha_acceso) }}</small>
                    </div>
                    <span class="fw-bold" :class="access.acceso_permitido ? 'access-granted' : 'access-denied'">
                      {{ access.acceso_permitido ? 'Permitido' : 'Denegado' }}
                    </span>
                  </li>
                </ul>
              </div>
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
import { Chart, registerables } from 'chart.js'

// Registrar todos los componentes de Chart.js
Chart.register(...registerables)

export default {
  name: 'Dashboard',
  components: {
    Navbar
  },
  data() {
    return {
      recentAccess: [],
      loading: false,
      error: null,
      pieChart: null,
      statsData: null
    }
  },
  async mounted() {
    await this.loadInitialData()
  },
  beforeUnmount() {
    // Destruir el chart cuando el componente se desmonte
    if (this.pieChart) {
      this.pieChart.destroy()
    }
  },
  watch: {
    // Observar cambios en statsData y crear el chart cuando los datos estén listos
    statsData: {
      handler(newStats) {
        if (newStats !== null) {
          this.$nextTick(() => {
            this.createPieChart(newStats)
          })
        }
      },
      immediate: false
    }
  },
  methods: {
    async loadInitialData() {
      this.loading = true
      this.error = null
      this.statsData = null
      
      let historyError = null;
      let statsError = null;

      // Cargar Accesos Recientes
      try {
        const historyResponse = await accessAPI.getHistory();
        this.recentAccess = historyResponse.data.slice(0, 5);
      } catch (error) {
        console.error('Error loading history:', error);
        historyError = 'No se pudieron cargar los accesos recientes.';
      }

      // Cargar Estadísticas de la Gráfica
      try {
        const statsResponse = await accessAPI.getStats();
        this.statsData = statsResponse.data;
        // El chart se creará automáticamente mediante el watcher
      } catch (error) {
        console.error('Error loading stats:', error);
        statsError = 'No se pudieron cargar las estadísticas.';
        this.statsData = { error: true };
      }
      
      // Manejar el estado de error general
      if(historyError && statsError) {
        this.error = 'Error al cargar el dashboard. Ambas secciones fallaron.';
      } else if (historyError) {
        this.error = historyError; 
      } else if (statsError) {
         this.error = statsError; 
      }

      this.loading = false
    },

    createPieChart(stats) {
      // Verificar que el canvas existe
      if (!this.$refs.pieChart) {
        console.warn('Canvas reference not found, retrying...');
        setTimeout(() => this.createPieChart(stats), 100);
        return;
      }

      // Destruir chart anterior si existe
      if (this.pieChart) {
        this.pieChart.destroy()
      }

      const ctx = this.$refs.pieChart.getContext('2d')
      
      // Si hay error en los datos
      if (stats.error) {
        this.pieChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Error al cargar'],
            datasets: [{
              backgroundColor: ['#ff5252'],
              borderColor: '#d32f2f',
              borderWidth: 1,
              data: [1]
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { 
                labels: { 
                  color: '#ffffff',
                  font: { size: 14 }
                } 
              },
              tooltip: {
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
              }
            }
          }
        })
        return;
      }
      
      // Si no hay datos
      if (stats.permitidos === 0 && stats.denegados === 0) {
        this.pieChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Sin Datos'],
            datasets: [{
              backgroundColor: ['#555'],
              borderColor: '#777',
              borderWidth: 1,
              data: [1]
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { 
                labels: { 
                  color: '#ffffff',
                  font: { size: 14 }
                } 
              },
              tooltip: {
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
              },
              title: {
                display: true,
                text: 'Comparativa de Accesos Totales',
                color: '#ffffff',
                font: { size: 16 }
              }
            }
          }
        })
      } else {
        // Datos normales
        this.pieChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Accesos Permitidos', 'Accesos Denegados'],
            datasets: [{
              backgroundColor: ['#00e676', '#ff5252'],
              borderColor: ['#00c853', '#d32f2f'],
              borderWidth: 2,
              data: [stats.permitidos, stats.denegados]
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { 
                labels: { 
                  color: '#ffffff',
                  font: { size: 14 }
                } 
              },
              tooltip: {
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const value = context.parsed;
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = Math.round((value / total) * 100);
                    return `${label}: ${value} (${percentage}%)`;
                  }
                }
              },
              title: {
                display: true,
                text: 'Comparativa de Accesos Totales',
                color: '#ffffff',
                font: { size: 16 }
              }
            }
          }
        })
      }
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A';
      
      try {
        const date = new Date(dateString);
        
        if (isNaN(date.getTime())) {
          const utcDate = new Date(dateString + ' UTC');
          return isNaN(utcDate.getTime()) 
            ? 'Fecha inválida' 
            : utcDate.toLocaleString('es-ES', { 
                day: '2-digit', 
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit' 
              });
        }
        
        return date.toLocaleString('es-ES', { 
          day: '2-digit', 
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit' 
        });
      } catch (error) {
        console.error('Error formatting date:', error);
        return 'Fecha inválida';
      }
    }
  }
}
</script>

<style scoped>
/* Estilos para el dashboard */
.main-container {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.card-custom {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  color: white;
}

.list-group-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  background: transparent !important;
}

.list-group-item:last-child {
  border-bottom: 0 !important;
}

/* Colores de acceso */
.access-granted {
  color: #00e676;
}

.access-denied {
  color: #ff5252;
}

/* Mejoras para la gráfica */
.card-title {
  font-weight: 600;
  font-size: 1.2rem;
}

.text-muted {
  color: rgba(255, 255, 255, 0.6) !important;
}

/* Asegurar que el canvas ocupe todo el espacio */
canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>