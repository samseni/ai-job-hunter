import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Input, Button } from '../../components/common'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-slate-900">Welcome back</h2>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Input required type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input required type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button fullWidth loading={loading} type="submit">
        Sign in
      </Button>
      <div className="flex justify-end gap-3 text-sm">
        <Link className="text-indigo-600" to="/forgot-password">Forgot password?</Link>
        <Link className="text-indigo-600" to="/register">Create account</Link>
      </div>
    </form>
  )
}
