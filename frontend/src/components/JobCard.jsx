import { MapPin, Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";

export default function JobCard({ job, saved, onSave }) {
  return (
    <div className="card job">
      <div className="job-top">
        <h3>{job.title}</h3>
        <button className="icon-btn" onClick={onSave} aria-label="Save job">
          {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
        </button>
      </div>
      <div className="muted">{job.company}</div>
      <div className="job-meta"><MapPin size={14} /> {job.location} · {job.type}{job.remote ? " · Remote" : ""}</div>
      <div className="muted">{job.salary}</div>
      <div className="job-actions">
        <span className="job-type">{job.type}{job.remote ? " · Remote" : ""}</span>
        <a href={job.link} target="_blank" rel="noreferrer" className="btn">View original <ExternalLink size={14} /></a>
      </div>
    </div>
  );
}
