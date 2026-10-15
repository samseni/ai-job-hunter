import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import MainLayout from './components/layout/MainLayout'
import AuthLayout from './components/layout/AuthLayout'
import ProtectedRoute from './components/common/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import JobDiscoveryPage from './pages/jobs/JobDiscoveryPage'
import JobDetailPage from './pages/jobs/JobDetailPage'
import ResumePage from './pages/resume/ResumePage'
import MatchPage from './pages/match/MatchPage'
import AutoApplyPage from './pages/autoApply/AutoApplyPage'
import CoverLetterPage from './pages/coverLetter/CoverLetterPage'
import TrackerPage from './pages/tracker/TrackerPage'
import InterviewPage from './pages/interview/InterviewPage'
import AnalyticsPage from './pages/analytics/AnalyticsPage'
import SettingsPage from './pages/settings/SettingsPage'

function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-indigo-600" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          <p className="text-slate-500">Loading...</p>
        </div>
      </div>
    )
  }
  if (user) return <Navigate to="/dashboard" replace />
  return children
}

import { useAuth } from './context/AuthContext'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
        <Route path="/reset-password" element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />
      </Route>
      
      <Route element={<MainLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/jobs" element={<JobDiscoveryPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/auto-apply" element={<AutoApplyPage />} />
          <Route path="/cover-letter" element={<CoverLetterPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}