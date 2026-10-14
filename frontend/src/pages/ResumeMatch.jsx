import { useState } from "react";
import client from "../api/client";

export default function ResumeMatch() {
  const [resumeText, setResumeText] = useState(() => localStorage.getItem("resumeText") || "");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [msg, setMsg] = useState("");

  // Ask AI for 3 suitable roles based on the resume, then one click fills the JD box.
  const suggest = async () => {
    if (!resumeText.trim()) { setMsg("Add your resume text first (or upload PDF on Resume page)."); return; }
    setMsg("Finding roles for you…"); setSuggestions([]);
    try {
      const r = await client.post("/ai/suggest", { resumeText });
      setSuggestions(r.data); setMsg("");
    } catch (e) {
      setMsg(e.response?.status === 503 ? "AI not configured — add OPENROUTER_API_KEY to backend/.env." : "Backend not running. Start it: node backend/src/index.js");
    }
  };

  const analyze = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setMsg("Paste both your resume and the job description first.");
      return;
    }
    setMsg("Analyzing…"); setResult(null);
    try {
      const r = await client.post("/ai/match", { resumeText, jobDescription });
      setResult(r.data); setMsg("");
    } catch (e) {
      setMsg(e.response?.status === 503 ? "AI not configured — add OPENROUTER_API_KEY to backend/.env." : "Backend not running. Start it: node backend/src/index.js");
    }
  };

  return (
    <div>
      <h1>AI Resume Match</h1>
      <p className="muted">Compare your resume against a job description.</p>
      <div className="card">
        <h3>Your resume</h3>
        <textarea rows={6} style={{ width: "100%" }} value={resumeText} onChange={(e) => setResumeText(e.target.value)} placeholder="Paste resume text (or upload PDF on Resume page)" />
        <h3>Job description</h3>
        <textarea rows={6} style={{ width: "100%" }} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the job description — or generate suggestions from your resume below" />
        <br /><br />
        <div className="filters">
          <button className="btn" onClick={suggest}>✨ Suggest roles from my resume</button>
          <button className="btn" onClick={analyze}>Analyze match</button>
        </div>
      </div>
      {suggestions.length > 0 && (
        <div className="card">
          <h3>Suggested roles (click to use)</h3>
          {suggestions.map((s, i) => (
            <div key={i} className="row">
              <strong>{s.title}</strong>
              <p className="muted">{s.description}</p>
              <button className="btn" onClick={() => { setJobDescription(`${s.title}\n\n${s.description}`); setMsg("Job description filled — click Analyze match."); }}>Use this role</button>
            </div>
          ))}
        </div>
      )}
      {msg && <p className="muted">{msg}</p>}
      {result && (
        <div className="card">
          <h3>Match score: {result.score}%</h3>
          <p><strong>Matching skills:</strong> {(result.matchedSkills || []).join(", ") || "—"}</p>
          <p><strong>Missing skills:</strong> {(result.missingSkills || []).join(", ") || "—"}</p>
          <p className="muted">{result.explanation}</p>
        </div>
      )}
    </div>
  );
}
