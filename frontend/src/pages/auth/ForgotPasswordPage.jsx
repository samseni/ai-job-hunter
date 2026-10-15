import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { authService } from '../../services/api'
import { Input, Button } from '../../components/common'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    await authService.forgotPassword(email)
    setSubmitted(true)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-slate-900">Reset password</h2>
      <Input required type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button fullWidth type="submit">Send reset link</Button>
      {submitted && <p className="text-sm text-slate-600">If the account exists, a reset instruction has been requested.</p>}
      <p className="text-sm"><Link to="/login" className="text-indigo-600">Back to sign in</Link></p>
    </form>
  )
}
