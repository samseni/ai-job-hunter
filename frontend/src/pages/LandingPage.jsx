import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/common'
import { Card } from '../components/common'

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 py-12">
      <header className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900">
          AI Career Companion
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Plan your job search with honest tools, privacy-first data, and review before every action.
        </p>
      </header>
      <div className="flex justify-center gap-4">
        <Link to="/register">
          <Button>Create account</Button>
        </Link>
        <Link to="/login">
          <Button variant="secondary">Sign in</Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {['Resume analysis', 'Job discovery', 'Application tracking'].map((item) => (
          <Card key={item}>
            <h2 className="text-lg font-semibold text-slate-900">{item}</h2>
            <p className="mt-2 text-sm text-slate-600">
              Open source project structure is ready for real API integrations.
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}
