import { useState } from 'react'
import { User, Shield, Bell, Briefcase, Gauge, Save } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Input } from '../../components/common'
import { Select } from '../../components/common'
import { Textarea } from '../../components/common'
import { Button } from '../../components/common'
import { Card } from '../../components/common'
import { Badge } from '../../components/common'

export default function SettingsPage() {
  const { user } = useAuth()
  const [form, setForm] = useState({ name: user?.name || 'Alex Johnson', role: user?.targetRole || 'Senior Frontend Developer', email: user?.email || 'demo@example.com', location: 'San Francisco, CA', salary: 140000 })
  const [saved, setSaved] = useState(false)

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }))
    setSaved(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Settings</h1>
        <p className="mt-1 text-slate-500">Manage profile, job preferences, safety controls, notifications, and account security.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card padding="p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-950"><User size={20} className="text-indigo-600" /> Personal profile</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input label="Display name" value={form.name} onChange={(e) => update('name', e.target.value)} />
              <Input label="Email" value={form.email} onChange={(e) => update('email', e.target.value)} />
              <Input label="Target role" value={form.role} onChange={(e) => update('role', e.target.value)} />
              <Input label="Preferred location" value={form.location} onChange={(e) => update('location', e.target.value)} />
              <Input type="number" label="Minimum salary" value={form.salary} onChange={(e) => update('salary', e.target.value)} />
              <Select label="Experience level" options={[
                { value: 'junior', label: 'Junior' },
                { value: 'mid', label: 'Mid-level' },
                { value: 'senior', label: 'Senior' },
              ]} />
            </div>
            <div className="mt-4">
              <Textarea label="Skills summary" rows={4} defaultValue="React, TypeScript, Node.js, GraphQL, Tailwind CSS, Jest, Docker, AWS" />
            </div>
          </Card>

          <Card padding="p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-950"><Briefcase size={20} className="text-indigo-600" /> Resume and cover letter</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {['Senior React', 'General Frontend', 'Startup Focus'].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{item}</p>
                  <p className="text-xs text-slate-500">resume.pdf · parsed and version tagged</p>
                  <Button size="sm" variant="ghost" className="mt-2">Make default</Button>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <Select label="Cover letter tone" options={[
                { value: 'professional', label: 'Professional' },
                { value: 'enthusiastic', label: 'Enthusiastic' },
                { value: 'concise', label: 'Concise' },
              ]} />
            </div>
          </Card>

          <Card padding="p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-950"><Gauge size={20} className="text-indigo-600" /> Auto-apply controls</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input type="number" label="Minimum match" defaultValue="80" />
              <Input type="number" label="Applications per day" defaultValue="5" />
              <Input type="number" label="Applications per week" defaultValue="20" />
              <Select label="Approval mode" options={[
                { value: 'manual', label: 'Manual approval' },
                { value: 'auto', label: 'Auto-apply eligible' },
                { value: 'discovery', label: 'Discovery only' },
              ]} />
            </div>
            <div className="mt-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-900"><p className="font-semibold">Auto-apply is disabled by default</p><p className="mt-1">Enable it only after reviewing verified profile data, limits, approval mode, and safety rules.</p></div>
          </Card>

          <div className="flex items-center gap-3">
            <Button size="lg" leftIcon={<Save size={18} />}>Save changes</Button>
            <Button variant="secondary" size="lg" onClick={() => setSaved(true)}>Preview profile</Button>
            {saved && <Badge variant="success">Saved locally</Badge>}
          </div>
        </div>

        <aside className="space-y-4">
          <Card padding="p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-950"><Shield size={18} className="text-emerald-500" /> Security</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>Password session: mock/local user remembered for development.</p>
              <p>Last login: today, 10:24 AM.</p>
              <p>API keys remain server-side in production.</p>
            </div>
            <Button variant="secondary" className="mt-5" leftIcon={<User size={18} />}>Change password</Button>
          </Card>
          <Card padding="p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-950"><Bell size={18} className="text-indigo-500" /> Notifications</h2>
            <div className="mt-4 space-y-3">
              {['New high matches', 'Application submitted', 'Interview reminders', 'Limit warnings'].map((item) => (
                <label key={item} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  {item}
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-indigo-600" />
                </label>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}
