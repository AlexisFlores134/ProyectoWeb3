<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <i class="fas fa-fingerprint me-2"></i>
        <span class="logo-text">ACCESS PRO</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard">
              <i class="fas fa-home me-1"></i> Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cards">
              <i class="fas fa-id-card me-1"></i> Tarjetas
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/history">
              <i class="fas fa-history me-1"></i> Historial
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/users">
              <i class="fas fa-users me-1"></i> Usuarios
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="logout">
              <i class="fas fa-sign-out-alt me-1"></i> Salir
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout() {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.navbar {
  background: rgba(26, 35, 126, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.logo-text {
  font-weight: 800;
  font-size: 1.8rem;
  background: linear-gradient(45deg, #4fc3f7, #2979ff, #304ffe);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.nav-link.router-link-active {
  background: rgba(26, 35, 126, 0.7) !important;
  color: #fff !important;
  font-weight: 600;
  border-radius: 8px;
}
</style>