import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authService } from '../../services/api'
import { Input, Button } from '../../components/common'

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
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-slate-900">Set new password</h2>
      <Input required type="password" label="New password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button fullWidth type="submit">Update password</Button>
    </form>
  )
}
