import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
  logout: () => api.post('/logout')
}

export const usersAPI = {
  getAll: () => api.get('/usuarios'),
  create: (userData) => api.post('/usuarios', userData),
  update: (id, userData) => api.put(`/usuarios/${id}`, userData),
  delete: (id) => api.delete(`/usuarios/${id}`)
}

export const cardsAPI = {
  getAll: () => api.get('/tarjetas'),
  create: (cardData) => api.post('/tarjetas', cardData),
  update: (id, cardData) => api.put(`/tarjetas/${id}`, cardData),
  toggleStatus: (id) => api.patch(`/tarjetas/${id}/toggle`)
}

export const accessAPI = {
  getHistory: (params = {}) => api.get('/accesos', { params }),
  getStats: () => api.get('/accesos/stats')
}

export default api