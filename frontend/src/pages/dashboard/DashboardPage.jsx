import { Link } from 'react-router-dom'
import { Area, AreaChart, Pie, PieChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { mockAnalytics, mockApplications, mockInterviews } from '../../services/mock/data'
import { Upload, Search, Bot, Mic, Clock, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '../../components/common'
import { Card } from '../../components/common'
import { Badge } from '../../components/common'

const overview = mockAnalytics.overview
const metrics = [
  { label: 'Jobs discovered', value: 124, change: '+12 this week', icon: Search },
  { label: 'Matching jobs', value: 45, change: '80% threshold', icon: SparklesIcon },
  { label: 'Applications', value: overview.totalApplications, change: `${overview.thisWeek} this week`, icon: Upload },
  { label: 'Interviews', value: overview.interviews, change: `${overview.offers} offers`, icon: Calendar },
  { label: 'Resume score', value: `${overview.resumeScore}%`, change: 'Strong profile', icon: Bot },
]

function SparklesIcon({ size }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m12 3 1.9 4.6L18.5 9l-4.6 1.9L12 15.5l-1.9-4.6L5.5 9l4.6-1.4z" /><path d="M19 3l.9 2.1L22 6l-2.1.9L19 9l-.9-2.1L16 6l2.1-.9z" /></svg>
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Dashboard</h1>
          <p className="mt-1 text-slate-500">Track your applications, matching jobs, and resume progress.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/resume"><Button leftIcon={<Upload size={18} />}>Upload resume</Button></Link>
          <Link to="/jobs"><Button variant="secondary" leftIcon={<Search size={18} />}>Find jobs</Button></Link>
          <Link to="/auto-apply"><Button variant="secondary" leftIcon={<Bot size={18} />}>Auto-apply</Button></Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map(({ label, value, change, icon: Icon }) => (
          <Card key={label} padding="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
                <p className="mt-2 text-xs font-medium text-slate-500">{change}</p>
              </div>
              <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600"><Icon size={20} /></div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <Card padding="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">Applications over time</h2>
              <p className="text-sm text-slate-500">Real records from mock history only.</p>
            </div>
            <Button variant="ghost" size="sm">Export report</Button>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={mockAnalytics.applicationsTrend}>
              <defs>
                <linearGradient id="applications" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.24} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="applications" stroke="#6366f1" fill="url(#applications)" strokeWidth={3} />
              <Area type="monotone" dataKey="interviews" stroke="#8b5cf6" fill="transparent" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card padding="p-5">
          <h2 className="text-xl font-bold text-slate-950">Application status</h2>
          <p className="text-sm text-slate-500">Distribution from tracked applications.</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={mockAnalytics.statusDistribution} dataKey="count" nameKey="status" innerRadius={70} outerRadius={100} paddingAngle={4}>
                {mockAnalytics.statusDistribution.map((item) => <Cell key={item.status} fill={item.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2">
            {mockAnalytics.statusDistribution.map((item) => (
              <div key={item.status} className="flex items-center gap-2 text-sm text-slate-600">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                {item.status}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card padding="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">Recent activity</h2>
              <p className="text-sm text-slate-500">What the companion did for you this week.</p>
            </div>
            <Badge variant="info">AI activity</Badge>
          </div>
          <div className="space-y-3">
            {[
              'Matched 7 jobs to your Senior Frontend profile.',
              'Prepared a cover letter draft for Full Stack Engineer at StartupXYZ.',
              'Reminder created: technical interview with Innovatech tomorrow at 2 PM.',
              'Daily application limit reached; agent paused to respect your configured quota.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600"><Clock size={16} /></div>
                <p className="flex-1 text-sm text-slate-700">{item}</p>
                <ArrowRight size={16} className="text-slate-300" />
              </div>
            ))}
          </div>
        </Card>

        <Card padding="p-5">
          <h2 className="text-xl font-bold text-slate-950">Upcoming interviews</h2>
          <div className="mt-4 space-y-3">
            {mockInterviews?.mockInterviews || ['Technical interview', 'System design interview'].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{item}</p>
                    <p className="text-sm text-slate-500">Mock interview timeline</p>
                  </div>
                  <Calendar size={18} className="text-indigo-500" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-900">
            <p className="font-semibold">Auto-apply status</p>
            <p className="mt-1">Disabled by default. Enable it in Settings after reviewing limits and approval mode.</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
