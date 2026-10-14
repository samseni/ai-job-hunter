import { useState } from "react";
import client from "../api/client";

export default function ResumeMatch() {
  const [resumeText, setResumeText] = useState(() => localStorage.getItem("resumeText") || "");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [msg, setMsg] = useState("");

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
        <textarea rows={6} style={{ width: "100%" }} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the job description" />
        <br /><br /><button className="btn" onClick={analyze}>Analyze match</button>
      </div>
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
