import { useParams } from 'react-router-dom'
import { mockJobs } from '../../services/mock/data'
import { ArrowLeft, Briefcase, MapPin, DollarSign, ShieldCheck, FileText } from 'lucide-react'
import { Card } from '../../components/common'
import { Button } from '../../components/common'
import { Badge } from '../../components/common'

export default function JobDetailPage() {
  const params = useParams()
  const job = mockJobs.find((item) => item.id === params.id) || mockJobs[0]

  return (
    <div className="space-y-6">
      <Button variant="ghost" leftIcon={<ArrowLeft size={18} />}>Back to jobs</Button>
      <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 p-8 text-white shadow-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-100">{job.company}</p>
            <h1 className="mt-2 text-4xl font-bold">{job.title}</h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="primary">88% match</Badge>
              <Badge variant={job.remote ? 'success' : 'slate'}>{job.remote ? 'Remote' : 'Hybrid'}</Badge>
              <Badge variant="warning">Demo posting</Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary">Save job</Button>
            <Button>Review application</Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <Card padding="p-7">
          <h2 className="text-xl font-bold text-slate-950">Role overview</h2>
          <p className="mt-3 leading-7 text-slate-600">{job.description}</p>
          <h3 className="mt-6 text-lg font-semibold text-slate-950">Requirements</h3>
          <div className="mt-3 flex flex-wrap gap-2">{job.requirements.map((item) => <Badge key={item} variant="slate">{item}</Badge>)}</div>
          <h3 className="mt-6 text-lg font-semibold text-slate-950">Benefits</h3>
          <div className="mt-3 flex flex-wrap gap-2">{job.benefits.map((item) => <Badge key={item} variant="success">{item}</Badge>)}</div>
        </Card>

        <aside className="space-y-4">
          <Card padding="p-6">
            <h2 className="text-lg font-bold text-slate-950">Quick facts</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex gap-3"><Briefcase size={17} /> {job.type}</div>
              <div className="flex gap-3"><MapPin size={17} /> {job.location}</div>
              <div className="flex gap-3"><DollarSign size={17} /> {job.salary}</div>
              <div className="flex gap-3"><FileText size={17} /> {job.source}</div>
            </div>
          </Card>
          <Card padding="p-6" bordered={false} className="bg-indigo-50">
            <div className="flex gap-3">
              <ShieldCheck className="mt-1 text-indigo-600" size={20} />
              <div>
                <h3 className="font-semibold text-slate-900">Application safety</h3>
                <p className="mt-1 text-sm text-slate-600">The real employer application is opened or submitted only through supported, authorized integrations after review.</p>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}
