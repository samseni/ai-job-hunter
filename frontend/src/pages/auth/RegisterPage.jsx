import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Input, Button } from '../../components/common'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register({ name, email, password })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-slate-900">Create account</h2>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Input required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input required type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input required type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button fullWidth loading={loading} type="submit">
        Register
      </Button>
      <p className="text-sm">
        Already have an account? <Link to="/login" className="text-indigo-600">Sign in</Link>
      </p>
    </form>
  )
}
