import { useMemo, useState } from 'react'
import { mockApplications } from '../../services/mock/data'
import { Plus, Trash2, Filter } from 'lucide-react'
import { Button } from '../../components/common'
import { Card } from '../../components/common'
import { Badge } from '../../components/common'
import { Input } from '../../components/common'

const statuses = ['Wishlist', 'Applied', 'Assessment', 'Interview', 'Offer', 'Rejected']

export default function TrackerPage() {
  const [applications, setApplications] = useState(mockApplications)
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [view, setView] = useState('kanban')

  function addApplication(event) {
    event.preventDefault()
    if (!title.trim()) return
    setApplications((items) => [{ id: crypto.randomUUID(), jobTitle: title.trim(), company, status: 'Wishlist', notes: '', date: new Date().toLocaleDateString(), jobUrl: '', salaryRange: '' }, ...items])
    setTitle('')
    setCompany('')
  }

  function updateStatus(id, status) {
    setApplications((items) => items.map((item) => (item.id || item._id) === id ? { ...item, status } : item))
  }

  const grouped = useMemo(() => Object.fromEntries(statuses.map((status) => [status, applications.filter((item) => item.status === status)])), [applications])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Application Tracker</h1>
          <p className="mt-1 text-slate-500">Kanban and table views for lifecycle, notes, and follow-up dates.</p>
        </div>
        <div className="flex gap-2">
          <Button variant={view === 'kanban' ? 'primary' : 'secondary'} size="sm" onClick={() => setView('kanban')}>Kanban</Button>
          <Button variant={view === 'table' ? 'primary' : 'secondary'} size="sm" onClick={() => setView('table')}>Table</Button>
        </div>
      </div>

      <Card padding="p-5">
        <form className="grid gap-3 sm:grid-cols-[2fr_2fr_auto]" onSubmit={addApplication}>
          <Input placeholder="Job title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
          <Button type="submit" leftIcon={<Plus size={18} />}>Add application</Button>
        </form>
      </Card>

      {view === 'kanban' && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          {statuses.map((status) => (
            <Card key={status} padding="p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-semibold text-slate-900">{status}</h2>
                <Badge variant="slate">{grouped[status].length}</Badge>
              </div>
              <div className="space-y-3">
                {grouped[status].map((item) => (
                  <div key={item.id || item._id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="font-semibold text-slate-900">{item.jobTitle}</p>
                    <p className="text-sm text-slate-500">{item.company}</p>
                    <select className="input mt-3 py-2 text-sm" value={item.status} onChange={(e) => updateStatus(item.id || item._id, e.target.value)}>
                      {statuses.map((option) => <option key={option}>{option}</option>)}
                    </select>
                    {item.notes && <p className="mt-2 rounded-xl bg-slate-50 p-2 text-xs text-slate-600">{item.notes}</p>}
                    <button className="mt-2 text-xs font-medium text-red-600 hover:text-red-700" onClick={() => setApplications((items) => items.filter((candidate) => (candidate.id || candidate._id) !== (item.id || item._id)))}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {view === 'table' && (
        <Card padding="p-0" className="overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Role</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Company</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Date</th>
                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {applications.map((item) => (
                <tr key={item.id || item._id} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium text-slate-900">{item.jobTitle}</td>
                  <td className="px-5 py-4 text-slate-600">{item.company}</td>
                  <td className="px-5 py-4"><Badge variant="primary">{item.status}</Badge></td>
                  <td className="px-5 py-4 text-slate-600">{item.date}</td>
                  <td className="px-5 py-4 text-right">
                    <button className="text-red-600 hover:text-red-700" onClick={() => setApplications((items) => items.filter((candidate) => (candidate.id || candidate._id) !== (item.id || item._id)))}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Filter size={14} />
        Mock records use local simulated history. Backend MongoDB remains unconfigured.
      </div>
    </div>
  )
}
