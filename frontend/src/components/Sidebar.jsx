import { NavLink } from "react-router-dom";
import { LayoutDashboard, Search, FileText, Sparkles, Mail, KanbanSquare, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/jobs", label: "Job Search", icon: Search },
  { to: "/resume", label: "Resume", icon: FileText },
  { to: "/match", label: "AI Resume Match", icon: Sparkles },
  { to: "/cover-letter", label: "AI Cover Letter", icon: Mail },
  { to: "/tracker", label: "Tracker", icon: KanbanSquare },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand">AI Job Hunter</div>
        <nav>
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} onClick={() => setOpen(false)}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="sample-note">AI-powered job hunt</div>
      </aside>
    </>
  );
}
