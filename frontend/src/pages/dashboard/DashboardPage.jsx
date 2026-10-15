import React from 'react'
import { Card } from '../../components/common'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
      <Card>
        <p className="text-slate-600">
          Track applications, job discovery, and resume work here once your backend is configured.
        </p>
      </Card>
    </div>
  )
}
