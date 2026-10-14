import { Briefcase, Bookmark, Send, CalendarCheck } from "lucide-react";
import { getSavedIds } from "../data/sampleJobs";

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="card stat">
      <Icon size={22} />
      <div><div className="stat-value">{value}</div><div className="stat-label">{label}</div></div>
    </div>
  );
}

export default function Dashboard() {
  const saved = getSavedIds().length;
  const apps = JSON.parse(localStorage.getItem("applications") || "[]");
  const interviews = apps.filter((a) => a.status === "Interview").length;
  return (
    <div>
      <h1>Welcome back 👋</h1>
      <p className="muted">Track your hunt: save jobs, apply, and follow up.</p>
      <div className="grid stats">
        <StatCard icon={Briefcase} label="Jobs viewed" value={0} />
        <StatCard icon={Bookmark} label="Saved jobs" value={saved} />
        <StatCard icon={Send} label="Applications" value={apps.length} />
        <StatCard icon={CalendarCheck} label="Interviews" value={interviews} />
      </div>
      <div className="card empty">
        <h3>Get started</h3>
        <p className="muted">Head to <strong>Job Search</strong> to find openings, then save them here. Your stats update automatically.</p>
      </div>
    </div>
  );
}
