import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// --- Objeto cardsAPI Corregido ---
export const cardsAPI = {
  getAll: () => api.get('/tarjetas'),
  update: (id, data) => api.put(`/tarjetas/${id}`, data),
  create: (data) => api.post('/tarjetas', data),
  delete: (id) => api.delete(`/tarjetas/${id}`),
  verifyAccess: (data) => api.post('/tarjetas/verificar-acceso', data),
}

// --- Objeto usersAPI (sin cambios) ---
export const usersAPI = {
  getAll: () => api.get('/usuarios'),
  create: (data) => api.post('/usuarios', data),
  update: (id, data) => api.put(`/usuarios/${id}`, data),
  delete: (id) => api.delete(`/usuarios/${id}`),
}

// --- Objeto accessAPI Corregido ---
export const accessAPI = {
  getHistory: (params = {}) => api.get('/accesos', { params }),
  getStats: () => api.get('/accesos/estadisticas'),
}

// --- Objeto authAPI (sin cambios) ---
export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
  logout: () => api.post('/logout'),
}

export default api