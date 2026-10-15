import { delay, mockUser, mockJobs, mockApplications, mockAnalytics, mockInterviews, mockResumeAnalysis, mockResumeImprovement, mockJobMatch } from './data'

class MockApiClient {
  constructor() {
    this.token = localStorage.getItem('mock_token')
    this.user = JSON.parse(localStorage.getItem('mock_user') || 'null')
    const storedUsers = localStorage.getItem('mock_users')
    this.users = storedUsers ? JSON.parse(storedUsers) : null
    if (!Array.isArray(this.users)) {
      this.users = [{ ...mockUser, password: 'password' }]
      localStorage.setItem('mock_users', JSON.stringify(this.users))
    }
  }

  setAuth(token, user) {
    this.token = token
    this.user = user
    localStorage.setItem('mock_token', token)
    localStorage.setItem('mock_user', JSON.stringify(user))
  }

  saveUsers() {
    localStorage.setItem('mock_users', JSON.stringify(this.users))
  }

  clearAuth() {
    this.token = null
    this.user = null
    localStorage.removeItem('mock_token')
    localStorage.removeItem('mock_user')
  }

  getAuthHeader() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {}
  }

  async request(method, url, data = null) {
    await delay(300, 800)

    // Auth endpoints
    if (url === '/auth/login' && method === 'POST') {
      const { email, password } = data
      const matched = this.users.find((account) => account.email === email && account.password === password)
      if (!matched) throw { response: { status: 401, data: { message: 'Invalid credentials' } } }
      const user = { ...matched }
      delete user.password
      this.setAuth('mock-jwt-token', user)
      return { data: { user, token: 'mock-jwt-token' } }
    }

    if (url === '/auth/register' && method === 'POST') {
      const newUser = { ...mockUser, ...data, id: Date.now() }
      this.users = [...this.users.filter((account) => account.email !== data.email), newUser]
      this.saveUsers()
      const safeUser = { ...newUser }
      delete safeUser.password
      this.setAuth('mock-jwt-token', safeUser)
      return { data: { user: safeUser, token: 'mock-jwt-token' } }
    }

    if (url === '/auth/logout' && method === 'POST') {
      this.clearAuth()
      return { data: { success: true } }
    }

    if (url === '/auth/me' && method === 'GET') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: { user: this.user } }
    }

    if (url === '/auth/profile' && method === 'PUT') {
      if (!this.user) throw { response: { status: 401 } }
      this.user = { ...this.user, ...data }
      localStorage.setItem('mock_user', JSON.stringify(this.user))
      return { data: { user: this.user } }
    }

    if (url === '/auth/forgot-password' && method === 'POST') {
      return { data: { success: true, message: 'Reset email sent' } }
    }

    if (url === '/auth/reset-password' && method === 'POST') {
      return { data: { success: true, message: 'Password reset successful' } }
    }

    // Resume endpoints
    if (url === '/resume/upload' && method === 'POST') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: { id: Date.now(), text: 'Extracted resume text...', pages: 2, skills: ['React', 'Node.js', 'TypeScript'] } }
    }

    if (url === '/resume/analyze' && method === 'POST') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: mockResumeAnalysis }
    }

    if (url === '/resume/improve' && method === 'POST') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: mockResumeImprovement }
    }

    if (url === '/resume' && method === 'GET') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: [] }
    }

    // Jobs endpoints
    if (url === '/jobs' && method === 'GET') {
      if (!this.user) throw { response: { status: 401 } }
      const { q, location, type, remote, page = 1, limit = 10 } = data || {}
      let filtered = [...mockJobs]

      if (q) {
        const query = q.toLowerCase()
        filtered = filtered.filter(j => j.title.toLowerCase().includes(query) || j.company.toLowerCase().includes(query))
      }
      if (location) {
        filtered = filtered.filter(j => j.location.toLowerCase().includes(location.toLowerCase()))
      }
      if (type) {
        filtered = filtered.filter(j => j.type === type)
      }
      if (remote) {
        filtered = filtered.filter(j => j.remote)
      }

      const start = (page - 1) * limit
      const paginated = filtered.slice(start, start + limit)

      return { data: { jobs: paginated, total: filtered.length, page, totalPages: Math.ceil(filtered.length / limit) } }
    }

    if (url.startsWith('/jobs/') && method === 'GET' && !url.includes('/save') && !url.includes('/match')) {
      if (!this.user) throw { response: { status: 401 } }
      const id = url.split('/')[2]
      const job = mockJobs.find(j => j.id === id)
      if (!job) throw { response: { status: 404 } }
      return { data: job }
    }

    if (url === '/jobs/match' && method === 'POST') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: mockJobMatch }
    }

    if (url === '/jobs/save' && method === 'POST') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: { success: true } }
    }

    if (url.startsWith('/jobs/save/') && method === 'DELETE') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: { success: true } }
    }

    if (url === '/jobs/saved' && method === 'GET') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: mockJobs.slice(0, 3) }
    }

    if (url === '/jobs/recommendations' && method === 'GET') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: mockJobs.slice(3, 6) }
    }

    // Applications endpoints
    if (url === '/applications' && method === 'GET') {
      if (!this.user) throw { response: { status: 401 } }
      const { status, page = 1, limit = 20 } = data || {}
      let filtered = [...mockApplications]
      if (status) filtered = filtered.filter(a => a.status === status)
      const start = (page - 1) * limit
      return { data: { applications: filtered.slice(start, start + limit), total: filtered.length } }
    }

    if (url === '/applications' && method === 'POST') {
      if (!this.user) throw { response: { status: 401 } }
      const newApp = { ...data, id: Date.now(), date: new Date().toISOString().split('T')[0], _id: Date.now() }
      mockApplications.unshift(newApp)
      return { data: newApp }
    }

    if (url.startsWith('/applications/') && method === 'GET' && !url.includes('/stats')) {
      if (!this.user) throw { response: { status: 401 } }
      const id = url.split('/')[2]
      const app = mockApplications.find(a => a.id === id || a._id === id)
      if (!app) throw { response: { status: 404 } }
      return { data: app }
    }

    if (url.startsWith('/applications/') && method === 'PUT') {
      if (!this.user) throw { response: { status: 401 } }
      const id = url.split('/')[2]
      const index = mockApplications.findIndex(a => a.id === id || a._id === id)
      if (index === -1) throw { response: { status: 404 } }
      mockApplications[index] = { ...mockApplications[index], ...data }
      return { data: mockApplications[index] }
    }

    if (url.startsWith('/applications/') && url.includes('/status') && method === 'PATCH') {
      if (!this.user) throw { response: { status: 401 } }
      const id = url.split('/')[2]
      const index = mockApplications.findIndex(a => a.id === id || a._id === id)
      if (index === -1) throw { response: { status: 404 } }
      mockApplications[index] = { ...mockApplications[index], status: data.status }
      return { data: mockApplications[index] }
    }

    if (url.startsWith('/applications/') && method === 'DELETE') {
      if (!this.user) throw { response: { status: 401 } }
      const id = url.split('/')[2]
      const index = mockApplications.findIndex(a => a.id === id || a._id === id)
      if (index === -1) throw { response: { status: 404 } }
      mockApplications.splice(index, 1)
      return { data: { success: true } }
    }

    if (url === '/applications/stats' && method === 'GET') {
      if (!this.user) throw { response: { status: 401 } }
      const stats = {
        total: mockApplications.length,
        thisWeek: mockApplications.filter(a => new Date(a.date) > new Date(Date.now() - 7 * 86400000)).length,
        interviews: mockApplications.filter(a => a.status === 'Interview').length,
        offers: mockApplications.filter(a => a.status === 'Offer').length,
        resumeScore: 85,
      }
      return { data: stats }
    }

    // Analytics endpoints
    if (url === '/analytics/overview' && method === 'GET') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: mockAnalytics.overview }
    }

    if (url === '/analytics/applications-trend' && method === 'GET') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: mockAnalytics.applicationsTrend }
    }

    if (url === '/analytics/status-distribution' && method === 'GET') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: mockAnalytics.statusDistribution }
    }

    if (url === '/analytics/conversion-rates' && method === 'GET') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: mockAnalytics.conversionRates }
    }

    if (url === '/analytics/top-skills' && method === 'GET') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: mockAnalytics.topSkills }
    }

    if (url === '/analytics/activity-heatmap' && method === 'GET') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: mockAnalytics.activityHeatmap }
    }

    // Interview endpoints
    if (url === '/interview/questions' && method === 'POST') {
      if (!this.user) throw { response: { status: 401 } }
      const { role, level, category } = data
      const questions = mockInterviews.questions.filter(q => q.category === category).slice(0, 5)
      return { data: { sessionId: Date.now(), questions } }
    }

    if (url === '/interview/answer' && method === 'POST') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: mockInterviews.feedback }
    }

    if (url === '/interview/history' && method === 'GET') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: mockInterviews.history }
    }

    if (url.startsWith('/interview/') && method === 'GET') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: mockInterviews.history[0] }
    }

    if (url === '/interview/progress' && method === 'GET') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: mockInterviews.progress }
    }

    if (url === '/interview/categories' && method === 'GET') {
      if (!this.user) throw { response: { status: 401 } }
      return { data: mockInterviews.categories }
    }

    throw { response: { status: 404, data: { message: `Mock endpoint not found: ${method} ${url}` } } }
  }

  get(url, config = {}) {
    return this.request('GET', url, config.params)
  }

  post(url, data, config = {}) {
    return this.request('POST', url, data)
  }

  put(url, data) {
    return this.request('PUT', url, data)
  }

  patch(url, data) {
    return this.request('PATCH', url, data)
  }

  delete(url) {
    return this.request('DELETE', url)
  }
}

export const mockClient = new MockApiClient()