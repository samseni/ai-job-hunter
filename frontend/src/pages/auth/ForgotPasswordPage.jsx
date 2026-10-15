import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { authService } from '../../services/api'
import { Input, Button, Card } from '../../components/common'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    await authService.forgotPassword(email)
    setSubmitted(true)
  }

  return (
    <Card padding="p-7" className="shadow-xl shadow-indigo-100/40">
      <div className="mb-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Mail size={24} />
        </div>
        <h2 className="mt-4 text-3xl font-bold text-slate-950">Reset password</h2>
        <p className="mt-2 text-slate-500">Request a link to recover access.</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input required type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button fullWidth type="submit">Send reset link</Button>
      </form>
      {submitted && <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">If the account exists, reset instructions have been requested.</p>}
      <p className="mt-6 text-center text-sm"><Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">Back to sign in</Link></p>
    </Card>
  )
}
