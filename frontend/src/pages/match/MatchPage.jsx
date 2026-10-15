import React from 'react'
import { Card } from '../../components/common'

export default function MatchPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">AI Matching</h1>
      <Card>
        <p className="text-slate-600">Resume matching requires configured AI services before analysis.</p>
      </Card>
    </div>
  )
}
