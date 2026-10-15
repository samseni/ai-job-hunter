import client from './client'

export const analyticsService = {
  async getOverview(params = {}) {
    const response = await client.get('/analytics/overview', { params })
    return response
  },

  async getApplicationsTrend(params = {}) {
    const response = await client.get('/analytics/applications-trend', { params })
    return response
  },

  async getStatusDistribution(params = {}) {
    const response = await client.get('/analytics/status-distribution', { params })
    return response
  },

  async getConversionRates(params = {}) {
    const response = await client.get('/analytics/conversion-rates', { params })
    return response
  },

  async getTopSkills(params = {}) {
    const response = await client.get('/analytics/top-skills', { params })
    return response
  },

  async getActivityHeatmap(params = {}) {
    const response = await client.get('/analytics/activity-heatmap', { params })
    return response
  },
}