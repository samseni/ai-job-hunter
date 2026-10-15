import { useState } from 'react'
import { mockJobMatch } from '../../services/mock/data'
import { Textarea } from '../../components/common'
import { Button } from '../../components/common'
import { Card } from '../../components/common'
import { Badge } from '../../components/common'
import { Progress } from '../../components/common'

const sampleResume = 'Senior frontend engineer with 4 years in React, TypeScript, Node.js, GraphQL, Tailwind CSS, testing, and cloud deployment.'
const sampleJob = 'We seek a senior full-stack engineer: 3+ years React/TypeScript, APIs, GraphQL, Kubernetes, CI/CD, and architecture leadership.'

export default function MatchPage() {
  const [resumeText, setResumeText] = useState(sampleResume)
  const [jobDescription, setJobDescription] = useState(sampleJob)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  function analyze(event) {
    event.preventDefault()
    setLoading(true)
    window.setTimeout(() => {
      setResult(mockJobMatch)
      setLoading(false)
    }, 800)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">AI Resume Match</h1>
        <p className="mt-1 text-slate-500">Compare a resume against a job description with explainable scoring.</p>
      </div>

      <form className="grid gap-6 xl:grid-cols-2" onSubmit={analyze}>
        <Card padding="p-6">
          <h2 className="text-xl font-bold text-slate-950">Your resume or profile</h2>
          <Textarea className="mt-4" rows={8} value={resumeText} onChange={(e) => setResumeText(e.target.value)} />
          <p className="mt-2 text-xs text-slate-500">Verified content only. Do not claim qualifications you cannot support.</p>
        </Card>
        <Card padding="p-6">
          <h2 className="text-xl font-bold text-slate-950">Job description</h2>
          <Textarea className="mt-4" rows={8} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
          <div className="mt-4 flex gap-3">
            <Button type="submit" loading={loading}>Analyze match</Button>
            <Button type="button" variant="secondary" onClick={() => setJobDescription((value) => value)}>Use sample job</Button>
          </div>
        </Card>
      </form>

      {result && (
        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <Card padding="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-950">Match score</h2>
              <Badge variant="primary">Explainable</Badge>
            </div>
            <div className="mt-5 flex items-center gap-5">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-violet-100">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-bold text-indigo-600">{result.score}%</div>
              </div>
              <div className="flex-1">
                <Progress value={result.score} />
                <p className="mt-3 text-sm text-slate-600">{result.experienceMatch}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-500">{result.explanation}</p>
          </Card>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card padding="p-6">
              <h3 className="text-lg font-semibold text-slate-950">Matching skills</h3>
              <div className="mt-3 flex flex-wrap gap-2">{result.matchedSkills.map((skill) => <Badge key={skill} variant="success">{skill}</Badge>)}</div>
            </Card>
            <Card padding="p-6">
              <h3 className="text-lg font-semibold text-slate-950">Missing skills</h3>
              <div className="mt-3 flex flex-wrap gap-2">{result.missingSkills.map((skill) => <Badge key={skill} variant="warning">{skill}</Badge>)}</div>
            </Card>
            <Card padding="p-6 sm:col-span-2">
              <h3 className="text-lg font-semibold text-slate-950">Recommended improvements</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {result.recommendations.map((item) => <li key={item} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500" /> {item}</li>)}
              </ul>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
