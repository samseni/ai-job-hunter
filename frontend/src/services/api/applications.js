import client from './client'

export const applicationsService = {
  async getAll(params = {}) {
    const response = await client.get('/applications', { params })
    return response
  },

  async getById(id) {
    const response = await client.get(`/applications/${id}`)
    return response
  },

  async create(data) {
    const response = await client.post('/applications', data)
    return response
  },

  async update(id, data) {
    const response = await client.put(`/applications/${id}`, data)
    return response
  },

  async updateStatus(id, status) {
    const response = await client.patch(`/applications/${id}/status`, { status })
    return response
  },

  async delete(id) {
    const response = await client.delete(`/applications/${id}`)
    return response
  },

  async getStats() {
    const response = await client.get('/applications/stats')
    return response
  },
}