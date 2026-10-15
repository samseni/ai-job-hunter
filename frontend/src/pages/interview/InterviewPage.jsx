import { useState } from 'react'
import { mockInterviews } from '../../services/mock/data'
import { BookOpen, LineChart, Sparkles } from 'lucide-react'
import { Select } from '../../components/common'
import { Textarea } from '../../components/common'
import { Button } from '../../components/common'
import { Card } from '../../components/common'
import { Badge } from '../../components/common'
import { Progress } from '../../components/common'
import { LineChart as RechartsLine, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function InterviewPage() {
  const [category, setCategory] = useState('frontend')
  const [difficulty, setDifficulty] = useState('medium')
  const [role, setRole] = useState('Senior Frontend Developer')
  const [questions, setQuestions] = useState([])
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)

  function generate() {
    setQuestions(mockInterviews.questions.filter((item) => item.category === category).slice(0, 5))
    setFeedback(null)
  }

  function submit() {
    setFeedback(mockInterviews.feedback)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Interview Preparation</h1>
        <p className="mt-1 text-slate-500">Practice role-specific technical and behavioral questions with AI feedback.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <Card padding="p-6">
          <h2 className="text-xl font-bold text-slate-950">Session setup</h2>
          <div className="mt-5 space-y-4">
            <Select label="Role" value={role} onChange={(e) => setRole(e.target.value)} options={[
              { value: 'Senior Frontend Developer', label: 'Senior Frontend Developer' },
              { value: 'Full Stack Engineer', label: 'Full Stack Engineer' },
              { value: 'Frontend Architect', label: 'Frontend Architect' },
            ]} />
            <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)} options={mockInterviews.categories.map((item) => ({ value: item.id, label: item.name }))} />
            <Select label="Difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} options={[
              { value: 'easy', label: 'Easy' },
              { value: 'medium', label: 'Medium' },
              { value: 'hard', label: 'Hard' },
            ]} />
            <Button fullWidth leftIcon={<Sparkles size={18} />} onClick={generate}>Generate questions</Button>
          </div>
          <div className="mt-6 space-y-3">
            {mockInterviews.categories.map((item) => (
              <div key={item.id} className="rounded-2xl bg-slate-50 p-3">
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-500">{item.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card padding="p-6">
            <h2 className="text-xl font-bold text-slate-950">Practice questions</h2>
            {questions.length ? (
              <div className="mt-5 space-y-4">
                {questions.map((question, index) => (
                  <div key={question.id} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold text-slate-900">Question {index + 1}</h3>
                      <Badge variant={question.difficulty === 'Hard' ? 'danger' : question.difficulty === 'Medium' ? 'warning' : 'success'}>{question.difficulty}</Badge>
                    </div>
                    <p className="mt-2 text-slate-700">{question.question}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-slate-500">Generate a set to start practicing. Questions remain clearly distinguishable from real employer assessments.</p>
            )}
          </Card>

          <Card padding="p-6">
            <h2 className="text-xl font-bold text-slate-950">Your answer and feedback</h2>
            <Textarea className="mt-4" rows={8} value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Write an answer, then request mock feedback..." />
            <div className="mt-4 flex gap-3">
              <Button onClick={submit} disabled={!answer.trim() || !questions.length}>Submit answer</Button>
              <Button variant="secondary" onClick={() => { setAnswer(''); setFeedback(null) }}>Reset</Button>
            </div>
            {feedback && (
              <div className="mt-5 rounded-3xl bg-slate-50 p-5">
                <div className="grid gap-3 sm:grid-cols-4">
                  {[['Relevance', feedback.relevance], ['Clarity', feedback.clarity], ['Structure', feedback.structure], ['Completeness', feedback.completeness]].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-xs font-semibold text-slate-600">{label}</p>
                      <Progress value={value} max={10} className="mt-2" />
                      <p className="mt-1 text-xs text-slate-500">{value}/10</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-900">Overall score: {feedback.overall}/10</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {feedback.suggestions.map((item) => <li key={item} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500" /> {item}</li>)}
                </ul>
              </div>
            )}
          </Card>

          <Card padding="p-6">
            <h2 className="text-xl font-bold text-slate-950">Progress</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <ResponsiveContainer width="100%" height={160}>
                <RechartsLine data={mockInterviews.progress.recentTrend.map((value, index) => ({ session: index + 1, score: value }))}>
                  <XAxis dataKey="session" hide />
                  <YAxis domain={[60, 100]} hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} />
                </RechartsLine>
              </ResponsiveContainer>
              <div className="flex flex-col justify-center">
                <p className="text-3xl font-bold text-slate-950">{mockInterviews.progress.averageScore}%</p>
                <p className="text-sm text-slate-500">{mockInterviews.progress.totalSessions} sessions completed</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
