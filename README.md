# AI Job Hunter

Help users find suitable jobs using their resumes and skills: analyze job matches, prepare applications, and track the job search.

Stack: React (Vite) + Express + MongoDB Atlas + OpenRouter (free tier) + Axios + Lucide React.

## Folders

- `frontend/` — Vite + React UI (port 5173)
- `backend/` — Express API (port 5000, owns all secrets)

## Prerequisites

- Node.js 18+
- MongoDB Atlas free (M0) cluster — connection string
- OpenRouter API key (free model) — optional until Stage 6 features needed

## Setup

```bash
# 1. Frontend
npm install --prefix frontend

# 2. Backend
npm install --prefix backend
cp backend/.env.example backend/.env
# edit backend/.env: set MONGO_URI and OPENROUTER_API_KEY
```

`backend/.env`:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/ai-job-hunter
OPENROUTER_API_KEY=
```

`frontend/.env` (already present):

```
VITE_API_URL=http://localhost:5000/api
```

## Run

```bash
node backend/src/index.js        # → http://localhost:5000/api/health
npm run dev --prefix frontend    # → http://localhost:5173
```

## API

| Method | Endpoint | Notes |
|---|---|---|
| GET | `/api/health` | `{ ok: true }` |
| GET | `/api/jobs` | Empty until a legitimate job API is configured |
| GET/POST | `/api/applications` | MongoDB CRUD (503 if `MONGO_URI` missing) |
| PATCH/DELETE | `/api/applications/:id` | Update status/notes, delete |
| POST | `/api/resume/upload` | Form field `resume` (PDF ≤5MB) → `{ text, pages }` |
| POST | `/api/ai/match` | `{ resumeText, jobDescription }` → score + skills (503 if no AI key) |
| POST | `/api/ai/cover-letter` | `{ resumeText, jobTitle, company, jobDescription }` → `{ draft }` |

## Honesty rules

- No hardcoded dummy jobs. Empty states are shown until real services respond.
- Missing keys return HTTP 503 with a clear message — success is never faked.
- Only legitimate job APIs. No scraping or auto-submission; users apply on the original posting via "View original" links.

## Git

Branch `main`. Secrets (`.env`) are git-ignored and never committed.
