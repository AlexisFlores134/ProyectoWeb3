<template>
  <div class="login-container">
    <div class="text-center mb-4">
      <i class="fas fa-fingerprint fa-3x mb-3" style="color: #4fc3f7;"></i>
      <h2 class="logo-text">ACCESO RFID</h2>
      <p class="text-light">Sistema de Control de Acceso RFID</p>
    </div>
    
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input 
          type="email" 
          class="form-control glass-effect" 
          id="email" 
          v-model="form.email"
          placeholder="Ingresa tu email"
          required
        >
      </div>
      <div class="mb-4">
        <label for="password" class="form-label">Contraseña</label>
        <input 
          type="password" 
          class="form-control glass-effect" 
          id="password" 
          v-model="form.password"
          placeholder="Ingresa tu contraseña"
          required
        >
      </div>
      <button type="submit" class="btn btn-primary w-100 py-2 fw-bold" :disabled="loading">
        {{ loading ? 'Iniciando...' : 'Iniciar Sesión' }}
      </button>
    </form>
    
    <div class="text-center mt-4">
      <p class="mb-0 text-light">¿Problemas para acceder?</p>
      <a href="#" class="text-info">Contactar al administrador</a>
    </div>
  </div>
</template>

<script>
import { authAPI } from '@/services/api'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false,
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.error = ''
      
      try {
        const response = await authAPI.login(this.form)
        
        if (response.data.success) {
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('user', JSON.stringify(response.data.user))
          this.$router.push('/dashboard')
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al iniciar sesión'
        alert(this.error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 10, 0.36);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.logo-text {
  font-weight: 800;
  font-size: 1.8rem;
  background: linear-gradient(45deg, #4fc3f7, #2979ff, #304ffe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>