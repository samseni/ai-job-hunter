import React from 'react'
import { Card } from '../../components/common'

export default function JobDiscoveryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Job Discovery</h1>
      <Card>
        <p className="text-slate-600">
          Job searches use real backend endpoints; empty results are expected until APIs are configured.
        </p>
      </Card>
    </div>
  )
}
