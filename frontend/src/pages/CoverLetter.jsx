import { useState } from "react";
import client from "../api/client";

export default function CoverLetter() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [draft, setDraft] = useState("");
  const [msg, setMsg] = useState("");
  const resumeText = localStorage.getItem("resumeText") || "";

  const generate = async () => {
    setMsg("Generating…"); setDraft("");
    try {
      const r = await client.post("/ai/cover-letter", { resumeText, jobTitle, company, jobDescription });
      setDraft(r.data.draft); setMsg("");
    } catch (e) {
      setMsg(e.response?.status === 503 ? "AI not configured — add OPENROUTER_API_KEY to backend/.env." : "Backend not running. Start it: node backend/src/index.js");
    }
  };

  return (
    <div>
      <h1>AI Cover Letter</h1>
      <p className="muted">Generate a tailored draft. Always review before sending.</p>
      <div className="card filters">
        <input placeholder="Job title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
        <input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>
      <div className="card">
        <textarea rows={5} style={{ width: "100%" }} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the job description" />
        <br /><br /><button className="btn" onClick={generate}>Generate draft</button>
      </div>
      {msg && <p className="muted">{msg}</p>}
      {draft && <div className="card"><h3>Draft</h3><p style={{ whiteSpace: "pre-wrap" }}>{draft}</p><button className="btn" onClick={() => navigator.clipboard.writeText(draft)}>Copy</button></div>}
    </div>
  );
}
