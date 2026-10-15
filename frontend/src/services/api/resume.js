import client from './client'

export const resumeService = {
  async upload(file, onProgress) {
    const formData = new FormData()
    formData.append('resume', file)

    const response = await client.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: onProgress,
    })
    return response
  },

  async analyze(resumeText, targetRole) {
    const response = await client.post('/resume/analyze', { resumeText, targetRole })
    return response
  },

  async improve(resumeText, jobDescription, targetRole) {
    const response = await client.post('/resume/improve', { resumeText, jobDescription, targetRole })
    return response
  },

  async getResumes() {
    const response = await client.get('/resume')
    return response
  },

  async deleteResume(id) {
    const response = await client.delete(`/resume/${id}`)
    return response
  },

  async downloadResume(id, format = 'pdf') {
    const response = await client.get(`/resume/${id}/download`, {
      params: { format },
      responseType: 'blob',
    })
    return response
  },
}