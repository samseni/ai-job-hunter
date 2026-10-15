import client from './client'

export const jobsService = {
  async search(params = {}) {
    const response = await client.get('/jobs', { params })
    return response
  },

  async getById(id) {
    const response = await client.get(`/jobs/${id}`)
    return response
  },

  async match(resumeText, jobDescription) {
    const response = await client.post('/jobs/match', { resumeText, jobDescription })
    return response
  },

  async save(jobId) {
    const response = await client.post('/jobs/save', { jobId })
    return response
  },

  async unsave(jobId) {
    const response = await client.delete(`/jobs/save/${jobId}`)
    return response
  },

  async getSaved() {
    const response = await client.get('/jobs/saved')
    return response
  },

  async getRecommendations() {
    const response = await client.get('/jobs/recommendations')
    return response
  },
}