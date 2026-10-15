import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, Lock, Mail } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Input, Button, Card } from '../../components/common'

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
    <Card padding="p-7" className="shadow-xl shadow-indigo-100/40">
      <div className="mb-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
          <UserPlus size={24} />
        </div>
        <h2 className="mt-4 text-3xl font-bold text-slate-950">Create account</h2>
        <p className="mt-2 text-slate-500">Join your AI-powered career workspace.</p>
      </div>
      {error && <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input required label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input required type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input required type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button fullWidth loading={loading} type="submit" size="lg">Register</Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">Sign in</Link>
      </p>
    </Card>
  )
}
