import { useState } from "react";
import client from "../api/client";

export default function Resume() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");

  const upload = async () => {
    if (!file) return;
    setMsg("Uploading…");
    const form = new FormData();
    form.append("resume", file);
    try {
      const r = await client.post("/resume/upload", form, { headers: { "Content-Type": "multipart/form-data" } });
      setText(r.data.text || "");
      localStorage.setItem("resumeText", r.data.text || "");
      setMsg(`Extracted ${r.data.pages || 1} page(s). Saved for AI match.`);
    } catch (e) {
      setMsg(e.response?.data?.error || "Backend not running. Start it: node backend/src/index.js");
    }
  };

  return (
    <div>
      <h1>Resume</h1>
      <p className="muted">Upload a PDF — text is extracted by the backend and reused for AI match.</p>
      <div className="card filters">
        <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0] || null)} />
        <button className="btn" onClick={upload} disabled={!file}>Extract text</button>
      </div>
      {msg && <p className="muted">{msg}</p>}
      <div className="card"><h3>Extracted text</h3><p style={{ whiteSpace: "pre-wrap" }}>{text || <span className="muted">Nothing extracted yet.</span>}</p></div>
    </div>
  );
}
