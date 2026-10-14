# AI Job Hunter — Detailed Guide

Repo: https://github.com/samseni/ai-job-hunter
Stack: React (Vite) + Express + MongoDB Atlas + OpenRouter (free) + Axios + Lucide React

---

## 1. What You Are Building

A full-stack job-search assistant with two folders:

- `frontend/` — what the user sees (React + Vite). Six pages behind a sidebar.
- `backend/` — the brain (Express + MongoDB). Owns secrets, PDF parsing, AI calls.

```
browser → React pages → Axios → Express API → MongoDB / OpenRouter AI
```

Secrets stay on the server. React code is visible in the browser, so it must never hold API keys.

---

## 2. Stage 1 — Frontend Shell + Dashboard

### Commands

```bash
npm create vite@latest frontend -- --template react
npm install react-router-dom axios lucide-react
npm run dev
# → http://localhost:5173
```

### Files to create

| File | Purpose |
|---|---|
| `src/App.jsx` | Router: `/`, `/jobs`, `/resume`, `/match`, `/cover-letter`, `/tracker` |
| `src/components/Layout.jsx` | Page shell (sidebar + content area) |
| `src/components/Sidebar.jsx` | Nav with Lucide icons + mobile hamburger |
| `src/pages/Dashboard.jsx` | 4 stat cards: total jobs, saved, applications, interviews + recent activity |
| `src/data/sampleJobs.js` | ~8 mock jobs, each with `source: "sample"` |
| `src/index.css` | Responsive CSS: cards, grid, sidebar collapses on mobile |

### Test

All pages render, sidebar navigates, layout works at 360px width.

---

## 3. Stage 2 — Job Search + Job Cards

### Files

| File | Purpose |
|---|---|
| `src/components/JobCard.jsx` | Title, company, location, type badge, salary, "View original" link (new tab), Save (heart) button |
| `src/pages/JobSearch.jsx` | Keyword search + location text + type dropdown (Full-time / Part-time / Contract / Remote) + remote-only checkbox |

### State

Saved job IDs → `localStorage` key `savedJobs` (JSON array).

### Rules

- Always link out to the original posting. Never apply inside the app.
- Mock jobs show a "Sample data" badge.

### Test

Type "react" → list filters. Click save → heart fills, Dashboard saved-count increases, survives refresh.

---

## 4. Stage 3 — Resume Page

### File

`src/pages/Resume.jsx`

### Behaviour

1. File input accepting `.pdf` only.
2. Show filename + size.
3. "Extracted text" panel — placeholder in Stage 3; real extraction wired to backend (`pdf-parse`) in Stage 5.

### Test

Upload a PDF → filename appears. Large / non-PDF files show a friendly error.

---

## 5. Stage 4 — Application Tracker

### File

`src/pages/Tracker.jsx`

### Behaviour

- Rows grouped by status: `Saved | Applied | Interview | Rejected | Offer`.
- Each row: job title, company, status dropdown, notes textarea, date.
- Persist in `localStorage` key `applications` first; backend replaces this in Stage 5.

### Test

Change status, add a note, refresh → data survives.

---

## 6. Stage 5 — Backend + MongoDB Atlas

### Commands

```bash
mkdir backend && npm init -y
npm install express mongoose cors dotenv multer pdf-parse
```

### Files

| File | Purpose |
|---|---|
| `backend/src/index.js` | Express app, `cors()`, `express.json()`, route mounting, `mongoose.connect(process.env.MONGO_URI)` |
| `backend/src/routes/jobs.js` | `GET /api/jobs` → sample list (labeled) |
| `backend/src/routes/resume.js` | `POST /api/resume/upload` (multer memory storage, 5MB limit) → `pdf-parse` → `{ text }` |
| `backend/src/models/Application.js` | Mongoose schema: `jobTitle, company, status(enum), notes, link, date` |
| `backend/src/routes/applications.js` | CRUD: `GET / POST / PATCH / DELETE /api/applications` |
| `backend/.env` | Real secrets — **never commit** |
| `backend/.env.example` | Same keys, empty values — **commit this** |

### `.env` shape

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/ai-job-hunter
OPENROUTER_API_KEY=
```

### Atlas setup

1. atlas.mongodb.com → free M0 cluster.
2. Network Access → allow your IP.
3. Connect → copy connection string → paste into `backend/.env` as `MONGO_URI`.

### Frontend wiring

`src/api/client.js`:

```js
import axios from "axios";
export default axios.create({ baseURL: import.meta.env.VITE_API_URL });
```

`frontend/.env`:

```
VITE_API_URL=http://localhost:5000/api
```

### Test

```bash
curl localhost:5000/api/health
curl localhost:5000/api/jobs
```

Upload PDF via Resume page → real extracted text appears.

---

## 7. Stage 6 — AI Features (OpenRouter, Free Tier)

### Backend

Install an OpenAI-compatible client or use `fetch` (OpenRouter supports OpenAI-style `/chat/completions`).

| Endpoint | Input | Output |
|---|---|---|
| `POST /api/ai/match` | `{ resumeText, jobDescription }` | `{ score, matchedSkills[], missingSkills[], explanation }` |
| `POST /api/ai/cover-letter` | `{ resumeText, jobTitle, company, jobDescription }` | `{ draft }` |

- Use a free model, e.g. `meta-llama/llama-3-8b-instruct:free`.
- If `OPENROUTER_API_KEY` is missing → return HTTP 503 `{ error: "AI not configured" }`. Never fake success.

### Frontend

| File | Purpose |
|---|---|
| `src/pages/ResumeMatch.jsx` | Two textareas (resume + JD) + Analyze button → score bar + skill chips + explanation |
| `src/pages/CoverLetter.jsx` | Job picker + Generate button → draft in a copy-able box |

If the backend returns 503 → yellow banner: "AI not configured — showing sample demo" with clearly labeled sample output.

### Test

- Without key → sample banner path.
- With key → real score and letter.

---

## 8. Stage 7 — Polish + README

- `README.md`: prerequisites, frontend + backend setup, `.env` instructions, scripts, sample-vs-real data note.
- Verify `.gitignore` covers `node_modules/`, `.env`, `dist/`, `build/`.
- Mobile QA at 360px: sidebar, cards, tracker all usable.

---

## 9. Daily Run

```bash
# terminal 1 — backend :5000
node backend/src/index.js

# terminal 2 — frontend :5173
npm run dev --prefix frontend
```

---

## 10. Honesty Rules

1. Every mock job carries `source: "sample"` + a "Sample data" badge.
2. Never claim a real job search or AI call succeeded when it did not — show the fallback banner.
3. Only legitimate job APIs. No scraping, no auto-applying. Users review and apply on the original site.
