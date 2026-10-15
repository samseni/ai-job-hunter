import { useMemo, useState } from 'react'
import { mockJobs } from '../../services/mock/data'
import { Search, MapPin, Briefcase, DollarSign, Bookmark, Eye, Bot, Filter } from 'lucide-react'
import { Button } from '../../components/common'
import { Card } from '../../components/common'
import { Badge } from '../../components/common'
import { Select } from '../../components/common'

export default function JobDiscoveryPage() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [minMatch, setMinMatch] = useState(70)

  const jobs = useMemo(() => mockJobs.filter((job) => {
    if (query && !(job.title + job.company).toLowerCase().includes(query.toLowerCase())) return false
    if (location && !job.location.toLowerCase().includes(location.toLowerCase())) return false
    if (type && job.type !== type) return false
    if (remoteOnly && !job.remote) return false
    return (job.matchScore ?? 85) >= minMatch
  }), [query, location, type, remoteOnly, minMatch])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Job Discovery</h1>
          <p className="mt-1 text-slate-500">Search authorized sources and clearly labeled demonstration jobs.</p>
        </div>
        <Badge variant="warning" size="lg">Demonstration data</Badge>
      </div>

      <Card padding="p-5">
        <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input className="input pl-10" placeholder="Keyword or company" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input className="input pl-10" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <Select value={type} onChange={(e) => setType(e.target.value)} options={[
            { value: 'Full-time', label: 'Full-time' },
            { value: 'Contract', label: 'Contract' },
            { value: 'Part-time', label: 'Part-time' },
          ]} placeholder="All job types" />
          <button onClick={() => setRemoteOnly((value) => !value)} className={`btn ${remoteOnly ? 'btn-primary' : 'btn-secondary'}`}>
            {remoteOnly ? 'Remote only' : 'All work modes'}
          </button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-3 text-sm font-medium text-slate-600">
            <Filter size={16} />
            Minimum match {minMatch}%
            <input type="range" min="50" max="100" value={minMatch} onChange={(e) => setMinMatch(Number(e.target.value))} className="w-40 accent-indigo-600" />
          </label>
          <span className="text-sm text-slate-500">{jobs.length} matching jobs</span>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        {jobs.map((job, index) => {
          const score = [91, 85, 78, 88, 72][index % 5]
          return (
            <Card key={job.id} hover>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-950">{job.title}</h2>
                    <Badge variant="primary">{score}% match</Badge>
                    <Badge variant={job.remote ? 'success' : 'slate'}>{job.remote ? 'Remote' : job.location}</Badge>
                  </div>
                  <p className="mt-1 text-slate-600">{job.company}</p>
                </div>
                <button className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600" aria-label={`Save ${job.title}`}>
                  <Bookmark size={19} />
                </button>
              </div>
              <p className="mt-4 line-clamp-2 text-slate-600">{job.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.requirements.slice(0, 4).map((skill) => <Badge key={skill} variant="slate">{skill}</Badge>)}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-500 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
                <span className="flex items-center gap-2"><Briefcase size={16} /> {job.type}</span>
                <span className="flex items-center gap-2"><DollarSign size={16} /> {job.salary}</span>
                <span className="flex items-center gap-2"><MapPin size={16} /> {job.location}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button size="sm">View details</Button>
                <Button size="sm" variant="secondary" leftIcon={<Bot size={16} />}>Queue for review</Button>
                <Button size="sm" variant="ghost" leftIcon={<Eye size={16} />}>View posting</Button>
              </div>
            </Card>
          )
        })}
      </div>

      {jobs.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <Search className="mx-auto mb-4 text-slate-300" size={42} />
          <h2 className="text-xl font-semibold text-slate-900">No jobs match those filters</h2>
          <p className="mt-2 text-slate-500">Broaden location, type, or match score. Demonstration records only.</p>
        </div>
      )}
    </div>
  )
}
