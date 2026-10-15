import client from './client'

export const interviewService = {
  async generateQuestions(data) {
    const response = await client.post('/interview/questions', data)
    return response
  },

  async submitAnswer(data) {
    const response = await client.post('/interview/answer', data)
    return response
  },

  async getHistory(params = {}) {
    const response = await client.get('/interview/history', { params })
    return response
  },

  async getSession(id) {
    const response = await client.get(`/interview/${id}`)
    return response
  },

  async getProgress() {
    const response = await client.get('/interview/progress')
    return response
  },

  async getCategories() {
    const response = await client.get('/interview/categories')
    return response
  },
}