# AI Job Hunter — Project Plan

> Repo: https://github.com/samseni/ai-job-hunter
> Stack: React (Vite) + Node/Express + MongoDB Atlas + OpenRouter (free) + Axios + Lucide React

## 1. Goal
Help users find suitable jobs using their resumes and skills: analyze job matches, prepare applications (resume match + cover letter), and track job search.

## 2. Tech Rules
- React.js with Vite only (no Next.js), plain JavaScript.
- Folders: `frontend/` and `backend/` separate.
- Clean, modern, responsive UI; reusable components + React Router.
- Secrets only in backend `.env`; never in frontend; never commit `.env`.
- Free tools only; no paid APIs without approval.
- Only legitimate job data sources / permitted APIs. No scraping or auto-submission. Users review and apply themselves via original job links.
- If external service unconfigured → use clearly-labeled sample data. Never fake success.
- README + .gitignore (secrets, node_modules, build files).

## 3. Features
1. **Dashboard** — totals: jobs viewed, saved jobs, applications, interviews.
2. **Job Search** — search + filters (keyword, location, type, remote), job cards (title, company, location, type, link).
3. **Resume page** — upload PDF, view extracted text.
4. **AI Resume Match** — resume vs job description → match score %, matching skills, missing skills, explanation.
5. **AI Cover Letter** — draft tailored to selected job + resume text.
6. **Application Tracker** — statuses: Saved, Applied, Interview, Rejected, Offer.
7. **Saved jobs + notes** — save/unsave, per-application notes.

## 4. Architecture
```
ai-job-hunter/
├── frontend/          # Vite + React + Router + Axios
│   └── src/
│       ├── components/  # Layout, Sidebar, JobCard, StatCard, etc.
│       ├── pages/       # Dashboard, JobSearch, Resume, ResumeMatch, CoverLetter, Tracker
│       ├── data/        # sampleJobs.js (labeled SAMPLE)
│       └── api/         # axios client
├── backend/           # Express + Mongoose + pdf-parse + OpenRouter
│   └── src/
│       ├── routes/      # jobs, resume, ai, applications
│       ├── models/      # Application.js, Resume.js
│       └── index.js
├── .env.example
├── README.md
└── AI_JOB_HUNTER_PLAN.md (this file)
```

- Frontend talks to backend via Axios (`VITE_API_URL`).
- Backend owns: MongoDB access, PDF parsing, OpenRouter AI calls.
- Job data v1: sample data (labeled). Real source later only via permitted API (e.g. Adzuna/Remotive — to be confirmed).

## 5. Implementation Stages
### Stage 1 — Frontend shell + Dashboard (no backend)
- Vite app, Router, Layout + Sidebar (Lucide icons), Dashboard with sample stats.
- Test: `npm run dev`, pages render, responsive.

### Stage 2 — Job Search + Job Cards
- Search/filter UI + JobCard grid + save button (localStorage).
- Test: filter by keyword/location/type.

### Stage 3 — Resume page
- PDF upload, client-side note + filename; text extraction wired to backend later.
- Test: upload shows file info.

### Stage 4 — Tracker
- Kanban/table by status + notes (localStorage first, Mongo later).
- Test: move status, add note persists.

### Stage 5 — Backend + MongoDB
- Express, `/api/health`, `/api/jobs` (sample), `/api/applications` CRUD (Mongoose), `/api/resume/upload` (pdf-parse).
- Test: curl endpoints, Atlas connect.

### Stage 6 — AI (OpenRouter, free model)
- `POST /api/ai/match` (score, matched/missing skills, explanation).
- `POST /api/ai/cover-letter` (draft).
- Graceful fallback: if no `OPENROUTER_API_KEY`, return 503 + clear message; frontend shows sample demo labeled as sample.
- Test: with/without key.

### Stage 7 — Polish: README, .env.example, .gitignore check, mobile QA.

## 6. Current State (2026-10-14)
- Folder empty except `.gitignore` + `.git`. Nothing to overwrite.
- Next: Stage 1 — scaffold `frontend/` with Vite.

## 7. Commands (preview)
```bash
# Stage 1
npm create vite@latest frontend -- --template react
npm install react-router-dom axios lucide-react
npm run dev
```

## 8. Sample-data & AI honesty rule
- All mock jobs carry `source: "sample"`, UI badge "Sample data".
- AI pages show banner when backend/AI key missing, with sample output clearly labeled.
