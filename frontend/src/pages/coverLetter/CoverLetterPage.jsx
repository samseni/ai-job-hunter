import React from 'react'
import { Card } from '../../components/common'

export default function CoverLetterPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Cover Letter</h1>
      <Card>
        <p className="text-slate-600">Cover letter generation requires configured AI services.</p>
      </Card>
    </div>
  )
}
