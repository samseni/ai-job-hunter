import React from 'react'
import { Card } from '../../components/common'

export default function AutoApplyPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Auto-Apply</h1>
      <Card>
        <p className="text-slate-600">
          Automatic application submission remains disabled until explicit user review and integration safeguards are enabled.
        </p>
      </Card>
    </div>
  )
}
