import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { mockAnalytics } from '../../services/mock/data'
import { ArrowUpRight, FileText, Bot, Briefcase } from 'lucide-react'
import { Card } from '../../components/common'
import { Badge } from '../../components/common'

export default function AnalyticsPage() {
  const overview = mockAnalytics.overview
  const cards = [
    { label: 'Applications', value: overview.totalApplications, detail: `${overview.thisWeek} this week`, icon: Briefcase },
    { label: 'Interview rate', value: `${overview.interviewRate}%`, detail: `${overview.interviews} interviews`, icon: ArrowUpRight },
    { label: 'Offer rate', value: `${overview.offerRate}%`, detail: `${overview.offers} offers`, icon: ArrowUpRight },
    { label: 'AI success', value: '3/4', detail: 'Applied with mock records only', icon: Bot },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Analytics</h1>
        <p className="mt-1 text-slate-500">Measure applications, interviews, resume matches, and auto-apply performance from tracked records.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, detail, icon: Icon }) => (
          <Card key={label} padding="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
                <p className="mt-2 text-xs text-slate-500">{detail}</p>
              </div>
              <Icon size={20} className="text-indigo-500" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card padding="p-5">
          <h2 className="text-xl font-bold text-slate-950">Application funnel</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockAnalytics.conversionRates}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rate" fill="#6366f1" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card padding="p-5">
          <h2 className="text-xl font-bold text-slate-950">Status distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={mockAnalytics.statusDistribution} dataKey="count" nameKey="status" innerRadius={60} outerRadius={95} paddingAngle={4}>
                {mockAnalytics.statusDistribution.map((item) => <Cell key={item.status} fill={item.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <Card padding="p-5">
          <h2 className="text-xl font-bold text-slate-950">Most requested skills</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={mockAnalytics.topSkills} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="skill" type="category" width={110} />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" radius={[0, 12, 12, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card padding="p-5">
          <h2 className="text-xl font-bold text-slate-950">Auto-apply log</h2>
          <div className="mt-4 space-y-3">
            {[
              ['Discovered', 42, 'slate'],
              ['Matched 80%+', 17, 'primary'],
              ['Prepared', 9, 'violet'],
              ['Submitted', 3, 'success'],
              ['Skipped', 12, 'warning'],
              ['Failed', 1, 'danger'],
            ].map(([label, value, variant]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-600">{label}</span>
                <Badge variant={variant}>{value}</Badge>
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-900">Analytics reflects local demonstration data and mock workflow counts.</p>
        </Card>
      </div>
    </div>
  )
}
