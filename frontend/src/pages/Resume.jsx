import { useState } from "react";

export default function Resume() {
  const [file, setFile] = useState(null);
  return (
    <div>
      <h1>Resume</h1>
      <div className="card">
        <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0] || null)} />
        {file && <p className="muted">{file.name} — {(file.size / 1024).toFixed(1)} KB</p>}
        <p className="muted">PDF text extraction connects to the backend in Stage 5.</p>
      </div>
      <div className="card"><h3>Extracted text</h3><p className="muted">Upload a resume to preview it here (backend coming soon).</p></div>
    </div>
  );
}
