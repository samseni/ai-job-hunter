import client from './client'

export const authService = {
  async login(credentials) {
    const response = await client.post('/auth/login', credentials)
    return response
  },

  async register(data) {
    const response = await client.post('/auth/register', data)
    return response
  },

  async logout() {
    const response = await client.post('/auth/logout')
    return response
  },

  async getMe() {
    const response = await client.get('/auth/me')
    return response
  },

  async updateProfile(data) {
    const response = await client.put('/auth/profile', data)
    return response
  },

  async forgotPassword(email) {
    const response = await client.post('/auth/forgot-password', { email })
    return response
  },

  async resetPassword(token, password) {
    const response = await client.post('/auth/reset-password', { token, password })
    return response
  },
}