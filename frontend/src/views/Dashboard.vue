<template>
  <div>
    <Navbar />
    <div class="container main-container">
      <h2 class="text-center mb-4">Panel de Control Principal</h2>
      
      <!-- Estadísticas -->
      <div class="row mb-4">
        <div class="col-md-3 mb-3" v-for="stat in stats" :key="stat.id">
          <div class="stats-box" :class="`stats-box-${stat.id}`">
            <i :class="stat.icon"></i>
            <h3>{{ stat.value }}</h3>
            <p>{{ stat.label }}</p>
          </div>
        </div>
      </div>
      
      <div class="row">
        <!-- Accesos Recientes -->
        <div class="col-md-6">
          <div class="card-custom">
            <div class="card-header">
              <h5 class="mb-0"><i class="fas fa-history me-2"></i>Accesos Recientes</h5>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>Hora</th>
                      <th>Usuario</th>
                      <th>Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="access in recentAccess" :key="access.id">
                      <td>{{ access.time }}</td>
                      <td>{{ access.user }}</td>
                      <td :class="access.granted ? 'access-granted' : 'access-denied'">
                        {{ access.granted ? 'Permitido' : 'Denegado' }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Actividad del Sistema -->
        <div class="col-md-6">
          <div class="card-custom">
            <div class="card-header">
              <h5 class="mb-0"><i class="fas fa-chart-line me-2"></i>Actividad del Sistema</h5>
            </div>
            <div class="card-body">
              <ActivityChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Layout/Navbar.vue'
import ActivityChart from '@/components/Charts/ActivityChart.vue'

export default {
  name: 'Dashboard',
  components: {
    Navbar,
    ActivityChart
  },
  data() {
    return {
      stats: [
        { id: 1, icon: 'fas fa-id-card', value: '9', label: 'Tarjetas Registradas' },
        { id: 2, icon: 'fas fa-check-circle', value: '42', label: 'Accesos Permitidos' },
        { id: 3, icon: 'fas fa-exclamation-circle', value: '8', label: 'Intentos Recientes' },
        { id: 4, icon: 'fas fa-times-circle', value: '10', label: 'Accesos Denegados' }
      ],
      recentAccess: [
        { id: 1, time: '08:23:15', user: 'Juan Pérez', granted: true },
        { id: 2, time: '08:45:32', user: 'María García', granted: true },
        { id: 3, time: '09:12:47', user: 'Carlos López', granted: false },
        { id: 4, time: '09:35:18', user: 'Ana Rodríguez', granted: true }
      ]
    }
  }
}
</script>

<style scoped>
.stats-box {
  text-align: center;
  padding: 20px;
  border-radius: 16px;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stats-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.stats-box i {
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.9);
}

.stats-box-1 {
  background: linear-gradient(135deg, #3949ab, #1a237e);
}

.stats-box-2 {
  background: linear-gradient(135deg, #00c853, #009624);
}

.stats-box-3 {
  background: linear-gradient(135deg, #ff9100, #f57c00);
}

.stats-box-4 {
  background: linear-gradient(135deg, #ff1744, #d50000);
}

.access-granted {
  color: #00e676;
  font-weight: 600;
}

.access-denied {
  color: #ff5252;
  font-weight: 600;
}

.card-header {
  background: rgba(26, 35, 126, 0.7);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px 16px 0 0 !important;
  padding: 15px 20px;
  font-weight: 600;
}

.main-container {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 10, 0.36);
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin: 30px auto;
  padding: 25px;
  overflow: hidden;
}
</style>