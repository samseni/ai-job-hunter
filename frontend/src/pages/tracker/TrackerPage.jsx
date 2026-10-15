import React from 'react'
import { Card } from '../../components/common'

export default function TrackerPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Application Tracker</h1>
      <Card>
        <p className="text-slate-600">Tracker data is loaded from the backend when available.</p>
      </Card>
    </div>
  )
}
