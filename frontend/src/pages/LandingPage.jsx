import { Link } from 'react-router-dom'
import { Sparkles, Search, FileText, KanbanSquare, Bot, Mic, ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '../components/common'
import { Card } from '../components/common'

const features = [
  { icon: FileText, title: 'Resume Intelligence', text: 'Extract experience, skills, keywords, and targeted improvements from PDF and DOCX resumes.' },
  { icon: Search, title: 'Job Discovery', text: 'Search authorized and permitted job sources with clear labels for demonstration data.' },
  { icon: Bot, title: 'AI Auto-Apply', text: 'Prepare only eligible applications, respect limits, and pause for sensitive steps.' },
  { icon: Mic, title: 'Interview Coach', text: 'Practice role-specific questions with structured feedback and score tracking.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm">
                <Sparkles size={16} />
                AI Career Companion for safer automated job applications
              </div>
              <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-slate-950 lg:text-6xl">
                Build a smarter, calmer job search with verified AI assistance
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Analyze resumes, match opportunities, prepare applications, prepare for interviews, and track results from one polished workspace designed for real job seekers.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register"><Button size="lg">Create account</Button></Link>
                <Link to="/login"><Button size="lg" variant="secondary">Sign in</Button></Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">
                <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" /> Auto-apply disabled by default</span>
                <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" /> Verified information only</span>
                <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" /> CAPTCHA never bypassed</span>
              </div>
            </div>
            <div className="rounded-4xl border border-white bg-white/80 p-5 shadow-2xl shadow-indigo-200/40 backdrop-blur">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ['Jobs discovered', '124'],
                  ['80%+ matches', '45'],
                  ['Applications', '24'],
                  ['Interviews', '5'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-500">{label}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-3xl bg-slate-900 p-5 text-white">
                <p className="text-sm text-indigo-200">Current auto-apply mode</p>
                <p className="mt-1 text-xl font-semibold">Discovery + manual approval</p>
                <p className="mt-2 text-sm text-slate-400">0 of 5 daily, 0 of 20 weekly applications used.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Core capabilities</p>
          <h2 className="mt-3 text-4xl font-bold text-slate-950">Everything around the job search, not just a chat box</h2>
          <p className="mt-4 text-slate-600">A complete product for finding opportunities, improving materials, applying safely, and measuring progress.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <Card key={title} hover>
              <div className="rounded-2xl bg-indigo-50 p-3 text-indigo-600 w-fit">
                <Icon size={24} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 lg:grid-cols-3 lg:px-8">
          {[
            ['1. Upload a verified resume', 'Confirm extracted profile details and select resume versions for different roles.'],
            ['2. Discover and match jobs', 'Review transparent scores, missing skills, and job-specific recommendations.'],
            ['3. Apply with controls', 'Let the agent prepare eligible applications while you approve, pause, or stop instantly.'],
          ].map(([title, description], index) => (
            <div key={title} className="rounded-3xl bg-slate-50 p-7">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 font-bold text-white">{index + 1}</div>
              <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-3 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-950 px-4 py-12 text-slate-400 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 lg:flex-row">
          <div>
            <p className="text-xl font-bold text-white">AI Career Companion</p>
            <p className="mt-2 max-w-md text-sm">A privacy-first career workspace. Applications require review, and automatic submission uses only verified information.</p>
          </div>
          <div className="flex gap-4 text-sm">
            <Link to="/register" className="hover:text-white">Get started</Link>
            <span>Privacy-first automation</span>
            <span>Authorized integrations only</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
