import client from './client'
import { mockClient } from '../mock'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const api = USE_MOCK ? mockClient : client

export const authService = {
  async login(credentials) {
    const response = await api.post('/auth/login', credentials)
    return response
  },

  async register(data) {
    const response = await api.post('/auth/register', data)
    return response
  },

  async logout() {
    const response = await api.post('/auth/logout')
    return response
  },

  async getMe() {
    const response = await api.get('/auth/me')
    return response
  },

  async updateProfile(data) {
    const response = await api.put('/auth/profile', data)
    return response
  },

  async forgotPassword(email) {
    const response = await api.post('/auth/forgot-password', { email })
    return response
  },

  async resetPassword(token, password) {
    const response = await api.post('/auth/reset-password', { token, password })
    return response
  },
}
