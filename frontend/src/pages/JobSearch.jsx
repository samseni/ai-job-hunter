import { useEffect, useState } from "react";
import { sampleJobs } from "../data/sampleJobs";
import client from "../api/client";
import JobCard from "../components/JobCard";

export default function JobSearch() {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [type, setType] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [jobs, setJobs] = useState(sampleJobs);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem("savedJobs") || "[]"); } catch { return []; }
  });

  // Load real jobs from backend; fall back to empty (no dummy data).
  useEffect(() => {
    client.get("/jobs").then((r) => setJobs(r.data || [])).catch(() => setJobs([])).finally(() => setLoading(false));
  }, []);

  const toggleSave = (id) => {
    const next = saved.includes(id) ? saved.filter((s) => s !== id) : [...saved, id];
    setSaved(next);
    localStorage.setItem("savedJobs", JSON.stringify(next));
  };

  const filtered = jobs.filter((j) => {
    if (q && !(j.title + j.company).toLowerCase().includes(q.toLowerCase())) return false;
    if (loc && !j.location.toLowerCase().includes(loc.toLowerCase())) return false;
    if (type && j.type !== type) return false;
    if (remoteOnly && !j.remote) return false;
    return true;
  });

  return (
    <div>
      <h1>Job Search</h1>
      <p className="muted">Search real openings. Saved jobs sync to your tracker.</p>
      <div className="card filters">
        <input placeholder="Keyword (title, company)" value={q} onChange={(e) => setQ(e.target.value)} />
        <input placeholder="Location" value={loc} onChange={(e) => setLoc(e.target.value)} />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All types</option>
          <option>Full-time</option><option>Part-time</option>
          <option>Contract</option><option>Internship</option>
        </select>
        <label><input type="checkbox" checked={remoteOnly} onChange={(e) => setRemoteOnly(e.target.checked)} /> Remote only</label>
      </div>
      {loading && <p className="muted">Loading jobs…</p>}
      {!loading && filtered.length === 0 && (
        <div className="card empty">
          <h3>No jobs found</h3>
          <p className="muted">The backend is not serving jobs yet (Stage 5). Try different filters, or check back once the API is connected.</p>
        </div>
      )}
      <div className="grid jobs">
        {filtered.map((j) => <JobCard key={j.id} job={j} saved={saved.includes(j.id)} onSave={() => toggleSave(j.id)} />)}
      </div>
    </div>
  );
}
