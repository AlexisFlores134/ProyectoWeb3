import { createApp } from 'vue'
import App from './App.vue'
// Asegúrate que la 'R' mayúscula coincida con tu carpeta/archivo de router
import router from './Router' 

// --- AÑADE ESTAS LÍNEAS ---
// 1. Importa el CSS de Bootstrap (para que se vea bien)
import 'bootstrap/dist/css/bootstrap.min.css'
// 2. ¡ESTA ES LA LÍNEA CRÍTICA QUE ARREGLA LOS MODALES!
import 'bootstrap/dist/js/bootstrap.bundle.min.js' 
// -------------------------

const app = createApp(App)
app.use(router)
app.mount('#app')