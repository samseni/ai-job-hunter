import { useState } from 'react'
import { Upload, FileText, CheckCircle2, AlertCircle, Sparkles, Download } from 'lucide-react'
import { mockResumeAnalysis } from '../../services/mock/data'
import { Button } from '../../components/common'
import { Card } from '../../components/common'
import { Badge } from '../../components/common'
import { Progress } from '../../components/common'

export default function ResumePage() {
  const [file, setFile] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  function handleAnalyze(event) {
    event.preventDefault()
    if (!file) return
    setAnalyzing(true)
    window.setTimeout(() => {
      setAnalysis(mockResumeAnalysis)
      setAnalyzing(false)
    }, 900)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Resume Management</h1>
        <p className="mt-1 text-slate-500">Upload, validate, analyze, and maintain resume versions for different roles.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <Card padding="p-6">
          <h2 className="text-xl font-bold text-slate-950">Upload resume</h2>
          <p className="mt-1 text-sm text-slate-500">PDF or DOCX up to 5 MB. Demonstrated processing only.</p>
          <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 p-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50" htmlFor="resume-input">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">
              <Upload size={24} />
            </div>
            <span className="font-semibold text-slate-900">{file ? file.name : 'Choose or drop a file'}</span>
            <span className="mt-2 text-sm text-slate-500">Secure backend extraction will populate profile fields.</span>
            <input id="resume-input" type="file" accept=".pdf,.docx" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>
          <Button className="mt-5 w-full" loading={analyzing} disabled={!file} onClick={handleAnalyze}>Analyze resume</Button>
          {file && <p className="mt-3 rounded-2xl bg-slate-50 p-3 text-xs text-slate-500">{file.name} · {Math.round(file.size / 1024)} KB</p>}
        </Card>

        <div className="space-y-6">
          <Card padding="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-950">AI analysis</h2>
                <p className="text-sm text-slate-500">Score, skills, keywords, and verified suggestions.</p>
              </div>
              <Badge variant="primary">Verified details only</Badge>
            </div>
            {analysis && (
              <div className="mt-5 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-indigo-100 text-2xl font-bold text-indigo-600">{analysis.overallScore}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">Strong resume</p>
                    <p className="text-sm text-slate-500">Highest score in education and technical skills.</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-5">
                  {analysis.categories.map((item) => (
                    <div key={item.name} className="rounded-2xl bg-slate-50 p-3">
                      <p className="text-xs font-semibold text-slate-900">{item.name}</p>
                      <div className="mt-2"><Progress value={item.score} max={item.maxScore} /></div>
                      <p className="mt-1 text-xs text-slate-500">{item.score}%</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Extracted skills</h3>
                  <div className="mt-2 flex flex-wrap gap-2">{analysis.extractedSkills.map((skill) => <Badge key={skill} variant="success">{skill}</Badge>)}</div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Missing keywords</h3>
                  <div className="mt-2 flex flex-wrap gap-2">{analysis.missingKeywords.map((skill) => <Badge key={skill} variant="warning">{skill}</Badge>)}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <h3 className="flex items-center gap-2 font-semibold text-slate-900"><AlertCircle size={18} className="text-amber-500" /> Improvements</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {analysis.improvements.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 text-emerald-500" /> {item}</li>)}
                  </ul>
                </div>
                <div className="flex gap-3">
                  <Button leftIcon={<Download size={18} />}>Export suggestions</Button>
                  <Button variant="secondary" leftIcon={<Sparkles size={18} />}>Improve bullets</Button>
                </div>
              </div>
            )}
            {!analysis && <p className="mt-5 text-sm text-slate-500">Upload a file to view a realistic demonstration analysis. No hidden parsing claims are made.</p>}
          </Card>

          <Card padding="p-6">
            <h2 className="text-xl font-bold text-slate-950">Resume versions</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {['General Frontend', 'Senior React', 'Startup Focus', 'Interview Practice'].map((item, index) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-900">{item}</p>
                  <p className="mt-1 text-xs text-slate-500">Created from extracted profile; optional role tailoring</p>
                  <div className="mt-3 flex gap-2">
                    <Badge variant={index === 0 ? 'success' : 'slate'}>{index === 0 ? 'Default' : 'Version'}</Badge>
                    <Button size="sm" variant="ghost">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
