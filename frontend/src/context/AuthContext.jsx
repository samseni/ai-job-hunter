import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authService } from '../services/api/auth'
import { mockClient } from '../services/mock'
import toast from 'react-hot-toast'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    try {
      const response = USE_MOCK
        ? await mockClient.get('/auth/me')
        : await authService.getMe()
      setUser(response.data.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const login = async (email, password) => {
    const response = USE_MOCK
      ? await mockClient.post('/auth/login', { email, password })
      : await authService.login({ email, password })
    setUser(response.data.user)
    toast.success('Welcome back!')
    return response.data
  }

  const register = async (data) => {
    const response = USE_MOCK
      ? await mockClient.post('/auth/register', data)
      : await authService.register(data)
    setUser(response.data.user)
    toast.success('Account created successfully!')
    return response.data
  }

  const logout = async () => {
    try {
      if (USE_MOCK) await mockClient.post('/auth/logout'); else await authService.logout()
    } catch {
      // Ignore logout errors
    }
    setUser(null)
    toast.success('Logged out successfully')
  }

  const updateProfile = async (data) => {
    const response = USE_MOCK
      ? await mockClient.put('/auth/profile', data)
      : await authService.updateProfile(data)
    setUser(response.data.user)
    toast.success('Profile updated')
    return response.data
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}