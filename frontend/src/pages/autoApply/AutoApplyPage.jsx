import { useState } from 'react'
import { Settings2, ShieldCheck, Timer, Activity, AlertTriangle, Play, Pause, OctagonX, CheckCircle2 } from 'lucide-react'
import { Button } from '../../components/common'
import { Card } from '../../components/common'
import { Badge } from '../../components/common'
import { Select } from '../../components/common'
import { Input } from '../../components/common'

export default function AutoApplyPage() {
  const [enabled, setEnabled] = useState(false)
  const [stopped, setStopped] = useState(false)
  const [mode, setMode] = useState('manual')
  const [settings, setSettings] = useState({ minimumMatch: 80, dailyLimit: 5, weeklyLimit: 20, resumeVersion: 'Senior React', approvalMode: 'manual' })

  const activity = [
    ['Discovered', '42 jobs', 'green'],
    ['Passed threshold', '17 jobs', 'indigo'],
    ['Prepared', '9 applications', 'violet'],
    ['Submitted', '3 applications', 'emerald'],
    ['Skipped', '12 duplicates', 'amber'],
    ['Failed', '1 transient error', 'red'],
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">AI Auto-Apply Agent</h1>
          <p className="mt-1 text-slate-500">Prepare, approve, and securely automate applications through authorized integrations.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant={enabled && !stopped ? 'success' : 'primary'} leftIcon={<Play size={17} />} onClick={() => { setEnabled(true); setStopped(false) }}>Enable</Button>
          <Button variant="secondary" leftIcon={<Pause size={17} />} onClick={() => setEnabled(false)}>Pause</Button>
          <Button variant="danger" leftIcon={<OctagonX size={17} />} onClick={() => { setEnabled(false); setStopped(true) }}>Emergency stop</Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card padding="p-5">
          <p className="text-sm text-slate-500">Current status</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{stopped ? 'Stopped' : enabled ? 'Active' : 'Paused'}</p>
          <Badge className="mt-3" variant={stopped ? 'danger' : enabled ? 'success' : 'warning'}>{mode} approval mode</Badge>
        </Card>
        <Card padding="p-5">
          <p className="text-sm text-slate-500">Limits</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{settings.dailyLimit}/day</p>
          <p className="mt-1 text-sm text-slate-500">{settings.weeklyLimit}/week configured</p>
        </Card>
        <Card padding="p-5">
          <p className="text-sm text-slate-500">Match threshold</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{settings.minimumMatch}%</p>
          <p className="mt-1 text-sm text-slate-500">Only eligible jobs proceed.</p>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card padding="p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-950"><Settings2 size={20} className="text-indigo-600" /> Configuration</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Select label="Approval mode" value={settings.approvalMode} onChange={(e) => setSettings({ ...settings, approvalMode: e.target.value })} options={[
                { value: 'manual', label: 'Manual approval' },
                { value: 'auto', label: 'Auto-apply eligible' },
                { value: 'discovery', label: 'Discovery only' },
              ]} />
              <Input type="number" label="Minimum match %" value={settings.minimumMatch} onChange={(e) => setSettings({ ...settings, minimumMatch: e.target.value })} />
              <Input type="number" label="Max applications per day" value={settings.dailyLimit} onChange={(e) => setSettings({ ...settings, dailyLimit: e.target.value })} />
              <Input type="number" label="Max applications per week" value={settings.weeklyLimit} onChange={(e) => setSettings({ ...settings, weeklyLimit: e.target.value })} />
              <Select label="Resume version" value={settings.resumeVersion} onChange={(e) => setSettings({ ...settings, resumeVersion: e.target.value })} options={[{ value: 'Senior React', label: 'Senior React' }, { value: 'General Frontend', label: 'General Frontend' }]} />
              <Select label="Cover letter template" value="standard" onChange={() => {}} options={[{ value: 'standard', label: 'Standard' }, { value: 'concise', label: 'Concise' }]} />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Software Engineer', 'Frontend Developer', 'Full Stack Engineer', 'React Developer'].map((item) => <Badge key={item} variant="slate">{item}</Badge>)}
            </div>
          </Card>

          <Card padding="p-6">
            <h2 className="text-xl font-bold text-slate-950">Application queue</h2>
            <p className="mt-1 text-sm text-slate-500">Safety gates are visible before any submission is attempted.</p>
            <div className="mt-5 space-y-3">
              {[
                ['Senior Frontend Developer', 'TechCorp', '91%', 'Ready to submit', 'violet'],
                ['Full Stack Engineer', 'StartupXYZ', '86%', 'Awaiting approval', 'amber'],
                ['React Native Developer', 'MobileFirst', '79%', 'Awaiting information', 'amber'],
                ['Frontend Architect', 'Enterprise Solutions', '88%', 'Scheduled', 'blue'],
              ].map(([title, company, score, status, color]) => (
                <div key={title} className="flex flex-col gap-3 rounded-3xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{title}</p>
                    <p className="text-sm text-slate-500">{company} · {score} match</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={color}>{status}</Badge>
                    <Button size="sm" variant="secondary">Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card padding="p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-950"><Activity size={20} className="text-indigo-600" /> Activity log</h2>
            <div className="mt-4 space-y-3">
              {activity.map(([label, value, color]) => (
                <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-sm text-slate-600">{label}</span>
                  <Badge variant={color}>{value}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-950"><ShieldCheck size={20} className="text-emerald-500" /> Safety rules</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 text-emerald-500" /> Auto-apply starts disabled and requires explicit enable.</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 text-emerald-500" /> Daily and weekly limits stop further runs.</li>
              <li className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 text-emerald-500" /> Missing or sensitive answers stay as required user input.</li>
              <li className="flex gap-2"><AlertTriangle size={16} className="mt-0.5 text-amber-500" /> Emergency stop changes in-flight intent locally; server queue integration required for production.</li>
            </ul>
          </Card>

          <Card padding="p-6" bordered={false} className="bg-indigo-50">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-950"><Timer size={20} className="text-indigo-600" /> Last run</h2>
            <p className="mt-3 text-sm text-slate-600">2 min ago · 3 applications prepared, 1 awaiting information, 0 submitted because approval mode is manual.</p>
          </Card>
        </aside>
      </div>
    </div>
  )
}
