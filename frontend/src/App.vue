<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Importar Bootstrap */
@import 'bootstrap/dist/css/bootstrap.min.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
@import 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';

:root {
  --primary: #1a237e;
  --secondary: #283593;
  --accent: #3949ab;
  --success: #00c853;
  --danger: #ff1744;
  --warning: #ff9100;
  --light: #e8eaf6;
  --dark: #1a237e;
}

body {
  background: linear-gradient(rgba(20, 20, 30, 0.85), rgba(10, 10, 25, 0.9)), 
              url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80') 
              no-repeat center center fixed;
  background-size: cover;
  font-family: 'Montserrat', sans-serif;
  color: #fff;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.glass-effect {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 10, 0.36);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.card-custom {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-custom:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.btn-primary {
  background: var(--accent);
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #303f9f;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
</style>