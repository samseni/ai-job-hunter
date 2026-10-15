import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { authService } from '../../services/api'
import { Input, Button, Card } from '../../components/common'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const token = searchParams.get('token') || ''
    await authService.resetPassword(token, password)
    navigate('/login')
  }

  return (
    <Card padding="p-7" className="shadow-xl shadow-indigo-100/40">
      <div className="mb-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Lock size={24} />
        </div>
        <h2 className="mt-4 text-3xl font-bold text-slate-950">Set new password</h2>
        <p className="mt-2 text-slate-500">Choose a strong password for your account.</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input required type="password" label="New password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button fullWidth type="submit" size="lg">Update password</Button>
      </form>
    </Card>
  )
}
