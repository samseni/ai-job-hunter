import { useState } from "react";
const STATUSES = ["Saved", "Applied", "Interview", "Rejected", "Offer"];

export default function Tracker() {
  const [apps, setApps] = useState(() => {
    try { return JSON.parse(localStorage.getItem("applications") || "[]"); } catch { return []; }
  });
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  const save = (next) => { setApps(next); localStorage.setItem("applications", JSON.stringify(next)); };
  const add = () => {
    if (!title.trim()) return;
    save([...apps, { id: Date.now(), jobTitle: title, company, status: "Saved", notes: "", date: new Date().toLocaleDateString() }]);
    setTitle(""); setCompany("");
  };
  const update = (id, patch) => save(apps.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  return (
    <div>
      <h1>Application Tracker</h1>
      <div className="card filters">
        <input placeholder="Job title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
        <button className="btn" onClick={add}>Add</button>
      </div>
      {STATUSES.map((s) => (
        <div key={s} className="card">
          <h3>{s} ({apps.filter((a) => a.status === s).length})</h3>
          {apps.filter((a) => a.status === s).map((a) => (
            <div key={a.id} className="row track">
              <strong>{a.jobTitle}</strong> <span className="muted">@ {a.company}</span>
              <select value={a.status} onChange={(e) => update(a.id, { status: e.target.value })}>
                {STATUSES.map((x) => <option key={x}>{x}</option>)}
              </select>
              <input placeholder="Notes" value={a.notes} onChange={(e) => update(a.id, { notes: e.target.value })} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
