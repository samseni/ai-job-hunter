import React from 'react'
import { Card } from '../../components/common'

export default function ResumePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Resume</h1>
      <Card>
        <p className="text-slate-600">Resume processing is available through the backend resume API.</p>
      </Card>
    </div>
  )
}
