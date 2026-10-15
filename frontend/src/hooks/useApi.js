import { useState, useEffect, useCallback } from 'react'
import { mockClient } from '../services/mock'
import { authService, resumeService, jobsService, applicationsService, analyticsService, interviewService } from '../services/api'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

const api = USE_MOCK ? mockClient : {
  auth: authService,
  resume: resumeService,
  jobs: jobsService,
  applications: applicationsService,
  analytics: analyticsService,
  interview: interviewService,
}

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await api.get('/auth/me')
        setUser(response.data.user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    setUser(response.data.user)
    return response.data
  }

  const register = async (data) => {
    const response = await api.post('/auth/register', data)
    setUser(response.data.user)
    return response.data
  }

  const logout = async () => {
    await api.post('/auth/logout')
    setUser(null)
  }

  const updateProfile = async (data) => {
    const response = await api.put('/auth/profile', data)
    setUser(response.data.user)
    return response.data
  }

  return { user, loading, login, register, logout, updateProfile, isAuthenticated: !!user }
}

export function useJobs(params = {}) {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 })

  const fetchJobs = useCallback(async (newParams = {}) => {
    setLoading(true)
    setError(null)
    try {
      const mergedParams = { ...params, ...newParams }
      const response = await api.get('/jobs', { params: mergedParams })
      setJobs(response.data.jobs || response.data)
      if (response.data.pagination) {
        setPagination(response.data.pagination)
      } else if (response.data.totalPages) {
        setPagination({
          page: response.data.page || 1,
          totalPages: response.data.totalPages,
          total: response.data.total,
        })
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch jobs')
    } finally {
      setLoading(false)
    }
  }, [params])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  return { jobs, loading, error, pagination, refetch: fetchJobs }
}

export function useJob(id) {
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    const fetchJob = async () => {
      setLoading(true)
      try {
        const response = await api.get(`/jobs/${id}`)
        setJob(response.data)
      } catch (err) {
        setError(err.message || 'Failed to fetch job')
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [id])

  return { job, loading, error }
}

export function useApplications(params = {}) {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState(null)

  const fetchApplications = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.get('/applications', { params })
      setApplications(response.data.applications || response.data)
    } catch (err) {
      setError(err.message || 'Failed to fetch applications')
    } finally {
      setLoading(false)
    }
  }, [params])

  const fetchStats = useCallback(async () => {
    try {
      const response = await api.get('/applications/stats')
      setStats(response.data)
    } catch {
      // Ignore stats errors
    }
  }, [])

  useEffect(() => {
    fetchApplications()
    fetchStats()
  }, [fetchApplications, fetchStats])

  const createApplication = async (data) => {
    const response = await api.post('/applications', data)
    setApplications(prev => [response.data, ...prev])
    return response.data
  }

  const updateApplication = async (id, data) => {
    const response = await api.put(`/applications/${id}`, data)
    setApplications(prev => prev.map(a => (a.id === id || a._id === id) ? response.data : a))
    return response.data
  }

  const updateStatus = async (id, status) => {
    const response = await api.patch(`/applications/${id}/status`, { status })
    setApplications(prev => prev.map(a => (a.id === id || a._id === id) ? response.data : a))
    return response.data
  }

  const deleteApplication = async (id) => {
    await api.delete(`/applications/${id}`)
    setApplications(prev => prev.filter(a => a.id !== id && a._id !== id))
  }

  return { applications, loading, error, stats, createApplication, updateApplication, updateStatus, deleteApplication, refetch: fetchApplications }
}

export function useAnalytics(params = {}) {
  const [overview, setOverview] = useState(null)
  const [trend, setTrend] = useState([])
  const [distribution, setDistribution] = useState([])
  const [conversion, setConversion] = useState([])
  const [topSkills, setTopSkills] = useState([])
  const [heatmap, setHeatmap] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [overviewRes, trendRes, distRes, convRes, skillsRes, heatmapRes] = await Promise.all([
        api.get('/analytics/overview', { params }),
        api.get('/analytics/applications-trend', { params }),
        api.get('/analytics/status-distribution', { params }),
        api.get('/analytics/conversion-rates', { params }),
        api.get('/analytics/top-skills', { params }),
        api.get('/analytics/activity-heatmap', { params }),
      ])
      setOverview(overviewRes.data)
      setTrend(trendRes.data)
      setDistribution(distRes.data)
      setConversion(convRes.data)
      setTopSkills(skillsRes.data)
      setHeatmap(heatmapRes.data)
    } catch (err) {
      setError(err.message || 'Failed to fetch analytics')
    } finally {
      setLoading(false)
    }
  }, [params])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return { overview, trend, distribution, conversion, topSkills, heatmap, loading, error, refetch: fetchAll }
}

export function useInterview() {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [history, setHistory] = useState([])
  const [progress, setProgress] = useState(null)
  const [categories, setCategories] = useState([])

  const generateQuestions = async (data) => {
    setLoading(true)
    try {
      const response = await api.post('/interview/questions', data)
      setQuestions(response.data.questions)
      setSessionId(response.data.sessionId)
      setCurrentQuestionIndex(0)
      setAnswers({})
      setFeedback(null)
      return response.data
    } finally {
      setLoading(false)
    }
  }

  const submitAnswer = async (answer) => {
    const question = questions[currentQuestionIndex]
    const newAnswers = { ...answers, [question.id]: answer }
    setAnswers(newAnswers)

    if (currentQuestionIndex === questions.length - 1) {
      setLoading(true)
      try {
        const response = await api.post('/interview/answer', {
          sessionId,
          answers: newAnswers,
          questions,
        })
        setFeedback(response.data)
        return response.data
      } finally {
        setLoading(false)
      }
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const fetchHistory = async () => {
    try {
      const response = await api.get('/interview/history')
      setHistory(response.data)
    } catch {
      // Ignore
    }
  }

  const fetchProgress = async () => {
    try {
      const response = await api.get('/interview/progress')
      setProgress(response.data)
    } catch {
      // Ignore
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await api.get('/interview/categories')
      setCategories(response.data)
    } catch {
      // Ignore
    }
  }

  useEffect(() => {
    fetchHistory()
    fetchProgress()
    fetchCategories()
  }, [])

  const resetSession = () => {
    setQuestions([])
    setCurrentQuestionIndex(0)
    setAnswers({})
    setFeedback(null)
    setSessionId(null)
  }

  return {
    questions,
    currentQuestionIndex,
    currentQuestion: questions[currentQuestionIndex],
    answers,
    feedback,
    loading,
    sessionId,
    history,
    progress,
    categories,
    generateQuestions,
    submitAnswer,
    fetchHistory,
    resetSession,
  }
}

export function useResume() {
  const [analysis, setAnalysis] = useState(null)
  const [improvement, setImprovement] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyze = async (resumeText, targetRole) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post('/resume/analyze', { resumeText, targetRole })
      setAnalysis(response.data)
      return response.data
    } catch (err) {
      setError(err.message || 'Analysis failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const improve = async (resumeText, jobDescription, targetRole) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post('/resume/improve', { resumeText, jobDescription, targetRole })
      setImprovement(response.data)
      return response.data
    } catch (err) {
      setError(err.message || 'Improvement failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const upload = async (file, onProgress) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post('/resume/upload', file, { onProgress })
      return response.data
    } catch (err) {
      setError(err.message || 'Upload failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { analysis, improvement, loading, error, analyze, improve, upload }
}

export function useJobMatch() {
  const [match, setMatch] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const matchResume = async (resumeText, jobDescription) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post('/jobs/match', { resumeText, jobDescription })
      setMatch(response.data)
      return response.data
    } catch (err) {
      setError(err.message || 'Match failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { match, loading, error, matchResume }
}