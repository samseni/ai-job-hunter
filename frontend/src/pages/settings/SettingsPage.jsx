import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Card, Input, Button } from '../../components/common'

export default function SettingsPage() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.name || '')

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Settings</h1>
      <Card>
        <Input label="Display name" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="mt-4">
          <Button disabled>Save changes</Button>
        </div>
      </Card>
    </div>
  )
}
