import { useState } from 'react'
import { Copy, Download, FileText, Sparkles } from 'lucide-react'
import { Input } from '../../components/common'
import { Select } from '../../components/common'
import { Textarea } from '../../components/common'
import { Button } from '../../components/common'
import { Card } from '../../components/common'
import { Badge } from '../../components/common'

const draftTemplate = (jobTitle, company) => `Dear Hiring Team at ${company},

I am writing to express strong interest in the ${jobTitle} role. With hands-on experience building accessible, performant React applications and a product-focused approach to engineering, I can contribute immediately to your roadmap.

My recent work spans component architecture, GraphQL-backed front ends, testing, and cross-functional collaboration. I am especially motivated by opportunities where clean user experience and engineering quality move together.

Thank you for your time and consideration. I would welcome the chance to discuss how my experience aligns with ${company}'s goals.

Sincerely,
Alex Johnson`

export default function CoverLetterPage() {
  const [jobTitle, setJobTitle] = useState('Senior Frontend Developer')
  const [company, setCompany] = useState('TechCorp Inc.')
  const [tone, setTone] = useState('professional')
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(false)

  function generate(event) {
    event.preventDefault()
    setLoading(true)
    window.setTimeout(() => {
      setDraft(draftTemplate(jobTitle, company, tone))
      setLoading(false)
    }, 900)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Cover Letter Generator</h1>
        <p className="mt-1 text-slate-500">Draft role-specific letters from verified resume and profile content.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Card padding="p-6">
          <h2 className="text-xl font-bold text-slate-950">Inputs</h2>
          <form className="mt-5 space-y-4" onSubmit={generate}>
            <Input label="Job title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
            <Input label="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
            <Select label="Tone" value={tone} onChange={(e) => setTone(e.target.value)} options={[
              { value: 'professional', label: 'Professional' },
              { value: 'enthusiastic', label: 'Enthusiastic' },
              { value: 'concise', label: 'Concise' },
            ]} />
            <Textarea label="Job description" rows={6} defaultValue="Paste or use the selected job details. The letter will reference supported qualifications only." />
            <Button fullWidth type="submit" loading={loading} leftIcon={<Sparkles size={18} />}>Generate draft</Button>
          </form>
        </Card>

        <Card padding="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-slate-950">Editable draft</h2>
            <Badge variant="info">Verified content only</Badge>
          </div>
          {draft ? (
            <>
              <textarea className="input mt-5 h-full min-h-[360px] resize-vertical" value={draft} onChange={(e) => setDraft(e.target.value)} />
              <div className="mt-5 flex flex-wrap gap-3">
                <Button leftIcon={<Copy size={18} />} onClick={() => navigator.clipboard.writeText(draft)}>Copy text</Button>
                <Button variant="secondary" leftIcon={<Download size={18} />}>Download version</Button>
                <Button variant="ghost" leftIcon={<FileText size={18} />}>Save iteration</Button>
              </div>
            </>
          ) : (
            <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
              <FileText className="mx-auto mb-4 text-slate-300" size={42} />
              <p className="font-semibold text-slate-900">No draft generated yet</p>
              <p className="mt-2 text-slate-500">Provide a job title and company, then generate a reviewable draft.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
