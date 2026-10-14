import { useEffect, useState } from "react";
import client from "../api/client";
const STATUSES = ["Saved", "Applied", "Interview", "Rejected", "Offer"];

// Uses backend MongoDB when available, falls back to localStorage otherwise.
export default function Tracker() {
  const [apps, setApps] = useState(() => {
    try { return JSON.parse(localStorage.getItem("applications") || "[]"); } catch { return []; }
  });
  const [useBackend, setUseBackend] = useState(false);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    client.get("/applications").then((r) => { setApps(r.data); setUseBackend(true); }).catch(() => setUseBackend(false));
  }, []);

  const persistLocal = (next) => { setApps(next); localStorage.setItem("applications", JSON.stringify(next)); };

  const add = async () => {
    if (!title.trim()) return;
    const entry = { jobTitle: title, company, status: "Saved", notes: "" };
    if (useBackend) {
      const r = await client.post("/applications", entry);
      setApps([r.data, ...apps]);
    } else persistLocal([{ ...entry, id: Date.now(), date: new Date().toLocaleDateString() }, ...apps]);
    setTitle(""); setCompany("");
  };

  const update = async (id, patch) => {
    const key = useBackend ? "_id" : "id";
    if (useBackend) {
      const r = await client.patch(`/applications/${id}`, patch);
      setApps(apps.map((a) => (a[key] === id ? r.data : a)));
    } else persistLocal(apps.map((a) => (a[key] === id ? { ...a, ...patch } : a)));
  };

  const remove = async (id) => {
    const key = useBackend ? "_id" : "id";
    if (useBackend) { await client.delete(`/applications/${id}`); setApps(apps.filter((a) => a[key] !== id)); }
    else persistLocal(apps.filter((a) => a[key] !== id));
  };

  const idOf = (a) => (useBackend ? a._id : a.id);

  return (
    <div>
      <h1>Application Tracker</h1>
      <p className="muted">{useBackend ? "Synced with database." : "Backend DB not connected — saving locally."}</p>
      <div className="card filters">
        <input placeholder="Job title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
        <button className="btn" onClick={add}>Add</button>
      </div>
      {STATUSES.map((s) => (
        <div key={s} className="card">
          <h3>{s} ({apps.filter((a) => a.status === s).length})</h3>
          {apps.filter((a) => a.status === s).map((a) => (
            <div key={idOf(a)} className="row track">
              <strong>{a.jobTitle}</strong> <span className="muted">@ {a.company}</span>
              <select value={a.status} onChange={(e) => update(idOf(a), { status: e.target.value })}>
                {STATUSES.map((x) => <option key={x}>{x}</option>)}
              </select>
              <input placeholder="Notes" value={a.notes || ""} onChange={(e) => update(idOf(a), { notes: e.target.value })} />
              <button className="icon-btn" onClick={() => remove(idOf(a))} aria-label="Delete">✕</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
