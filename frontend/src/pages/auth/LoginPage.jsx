import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Input, Button, Card } from '../../components/common'

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
    <Card padding="p-8" className="w-full shadow-xl shadow-indigo-100/40">
      <div className="mb-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
          <Lock size={24} />
        </div>
        <h2 className="mt-4 text-3xl font-bold text-slate-950">Welcome back</h2>
        <p className="mt-2 text-slate-500">Sign in to continue your career workspace.</p>
      </div>
      {error && <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input required type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input required type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button fullWidth loading={loading} type="submit" size="lg">Sign in</Button>
      </form>
      <div className="mt-6 flex items-center justify-between text-sm">
        <Link className="font-medium text-indigo-600 hover:text-indigo-700" to="/forgot-password">Forgot password?</Link>
        <Link className="font-medium text-indigo-600 hover:text-indigo-700" to="/register">Create account</Link>
      </div>
      <p className="mt-6 rounded-2xl bg-slate-50 p-4 text-xs text-slate-500">Mock mode account: demo@example.com / password</p>
    </Card>
  )
}
