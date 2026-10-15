import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authService } from '../services/api/auth'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    try {
      const response = await authService.getMe()
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
    const response = await authService.login({ email, password })
    setUser(response.data.user)
    toast.success('Welcome back!')
    return response.data
  }

  const register = async (data) => {
    const response = await authService.register(data)
    setUser(response.data.user)
    toast.success('Account created successfully!')
    return response.data
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch {
      // Ignore logout errors
    }
    setUser(null)
    toast.success('Logged out successfully')
  }

  const updateProfile = async (data) => {
    const response = await authService.updateProfile(data)
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