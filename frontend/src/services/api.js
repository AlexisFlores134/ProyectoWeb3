import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

export const cardsAPI = {
  getAll: () => api.get('/tarjetas'),
  toggleStatus: (id, activa) => api.put(`/tarjetas/${id}`, { activa }),
  create: (data) => api.post('/tarjetas', data),
  verifyAccess: (data) => api.post('/tarjetas/verificar-acceso', data),
}

export const usersAPI = {
  getAll: () => api.get('/usuarios'),
  create: (data) => api.post('/usuarios', data),
  update: (id, data) => api.put(`/usuarios/${id}`, data),
  delete: (id) => api.delete(`/usuarios/${id}`),
}

export const accessAPI = {
  getHistory: (params = {}) => api.get('/accesos', { params }),
  getStats: () => api.get('/accesos/estadisticas'),
  getRecentAccess: () => axios.get('/api/accesos/recientes'),
  getStats: () => axios.get('/api/estadisticas'),
  getCardsInfo: () => axios.get('/api/tarjetas/info'),
  getUsersInfo: () => axios.get('/api/usuarios/info')

}

export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
  logout: () => api.post('/logout'),
}

export default api