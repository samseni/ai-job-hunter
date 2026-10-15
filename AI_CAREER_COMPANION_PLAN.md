# Project: AI Career Companion — AI-Powered Job Search and Auto-Apply Platform

## 1. Project Overview

Act as a senior React developer, UI/UX designer, AI engineer, and software architect.

Build a complete, modern, responsive web application named **AI Career Companion**. The platform helps job seekers analyze their resumes, discover suitable jobs, calculate resume-to-job compatibility, prepare for interviews, track applications, and automate job applications through supported integrations.

The most important feature is an **AI Auto-Apply Agent**. When a job matches the user's requirements and resume, the system should prepare the application, fill supported application fields, and submit it automatically when the user has explicitly enabled auto-apply and the employer's application method permits it.

The application should be suitable for fresh graduates, software developers, experienced professionals, and other job seekers.

## 2. Mandatory Frontend Technology

The frontend must use React only.

Use:
- React with Vite
- JavaScript ES6+
- JSX
- React functional components and Hooks
- React Router DOM
- Tailwind CSS
- Axios
- Recharts
- Lucide React

Do not use Next.js, Angular, Vue, or TypeScript.

Use reusable components, a modular architecture, clean code, responsive layouts, and consistent UI patterns.

The backend must be separate from the React frontend.

## 3. UI/UX Design

Build a polished SaaS-style application with:
- A professional white and light-gray theme with blue and violet accents.
- Responsive sidebar navigation.
- Top navigation with search, notifications, and profile menu.
- Dashboard cards, tables, filters, progress bars, and charts.
- Clean typography and consistent spacing.
- Mobile, tablet, and desktop support.
- Loading skeletons, toast messages, confirmation dialogs, and empty states.
- Accessible forms and keyboard navigation.

Do not create a generic chatbot interface. Build a complete career management product.

## 4. Main Application Pages

### A. Landing Page
- Explain the benefits of AI Career Companion.
- Introduce resume analysis, job matching, AI auto-apply, and interview preparation.
- Include feature sections, workflow explanation, and calls to action.
- Add a footer with product information and links.

### B. Authentication
- Registration.
- Login.
- Forgot-password flow.
- Form validation.
- Protected dashboard routes.
- Secure session management through the backend.

### C. Main Dashboard

Display:
- Total jobs discovered.
- Jobs matching the resume.
- Applications submitted.
- Applications awaiting review.
- Interviews scheduled.
- Offers received.
- Resume score.
- Recent activity.
- Upcoming interviews.
- Application status charts.

Add quick actions:
- Upload Resume.
- Find Matching Jobs.
- Start AI Auto-Apply.
- Practice Interview.

Include an AI activity panel that explains what the agent has done and which actions require the user's attention.

## 5. Resume Management and AI Analysis

Create a resume management module.

Features:
- Upload PDF and DOCX resumes.
- Validate file type and size.
- Show upload progress and processing status.
- Extract resume text securely through the backend.
- Identify education, skills, projects, certifications, and work experience.
- Display an overall resume assessment.
- Identify missing keywords and potential improvements.
- Generate suggested resume bullet points based only on the user's actual experience.
- Allow users to edit extracted information.
- Support multiple resume versions for different job roles.

Store resume files securely and restrict access to their owners.

## 6. Job Discovery

Build a job discovery page that retrieves jobs from authorized job APIs, employer career-site integrations, or permitted job feeds.

Features:
- Search by job title.
- Search by company.
- Filter by location.
- Remote, hybrid, and onsite filters.
- Experience-level filters.
- Salary filters when data is available.
- Skills filters.
- Employment type filters.
- Save jobs to a shortlist.
- Mark jobs as not relevant.
- Display job descriptions and application links.

Do not scrape job websites or bypass access controls. Use authorized integrations and supported APIs.

If real job APIs are not configured, provide realistic mock job data and clearly label it as demonstration data.

## 7. AI Resume-to-Job Matching Engine

For each job, compare the user's selected resume against the job description.

Evaluate:
- Required skills.
- Preferred skills.
- Relevant experience.
- Education requirements.
- Certifications.
- Role and responsibility alignment.
- Location and work preferences.
- Salary preferences.
- Experience-level compatibility.

Display:
- Match percentage.
- Matching skills.
- Missing skills.
- Relevant experience.
- Potential eligibility issues.
- Explanation of the score.
- Recommended improvements.

Make the score explainable. Do not claim that it predicts hiring decisions with certainty.

Allow users to configure their minimum match threshold, such as 75%.

## 8. NEW CORE FEATURE: AI Auto-Apply Agent

Build a dedicated AI Auto-Apply module that helps users apply to suitable jobs with minimal repetitive work.

### Step 1: User configuration

Before activating the agent, allow the user to configure:
- Target job titles.
- Preferred locations.
- Remote, hybrid, or onsite preference.
- Minimum salary.
- Experience level.
- Employment type.
- Required skills.
- Minimum resume match percentage.
- Maximum applications per day.
- Maximum applications per week.
- Selected resume version.
- Approved cover letter template.
- Work authorization and other relevant application information.

Provide an Auto-Apply enable/disable switch.

Auto-apply must be disabled by default.

### Step 2: Find matching jobs

The agent retrieves jobs through authorized data sources.

It evaluates each job against:
- The user's resume.
- Target job titles.
- Skills and experience.
- Location and salary preferences.
- Previously submitted applications.
- Job closing dates, where available.

Only jobs that satisfy the configured eligibility rules should move to the application preparation stage.

### Step 3: Prevent duplicate applications

Before preparing an application:
- Check the internal application history.
- Normalize company and job identifiers.
- Check job URLs and external job IDs.
- Mark previously applied jobs as duplicates.
- Avoid submitting the same application twice.
- Track expired or closed listings when the source provides that information.

### Step 4: Prepare the application

For each suitable job, the agent should:
- Select the appropriate resume version.
- Generate a job-specific cover letter.
- Map resume details to supported application fields.
- Prepare answers to routine application questions using verified user-provided information.
- Highlight missing required information.
- Show the match score and application summary.

Never invent degrees, work experience, certifications, employment dates, work authorization, or other personal information.

If a question cannot be answered reliably from verified user data, mark it as requiring user input.

### Step 5: Automated submission

Support these application methods in order of preference:

1. Official employer APIs or authorized application integrations.
2. Approved job platform integrations that permit application submission.
3. Supported application flows where automation is expressly allowed.

When the application method supports permitted automation, the user has enabled auto-apply, and all required information is verified, the system may submit the application automatically.

For unsupported websites, CAPTCHA, identity verification, restricted automated submissions, or sensitive declarations, pause and ask the user to complete the required action.

Do not bypass CAPTCHA, authentication safeguards, rate limits, or platform restrictions.

Do not claim that an application has been submitted until the submission service confirms success.

### Step 6: Application approval modes

Provide three modes:

**Mode 1 — Manual approval**
- The agent finds and scores matching jobs.
- It prepares the resume and cover letter.
- The user reviews and approves each application.
- The application is submitted through a supported method.

**Mode 2 — Auto-apply to eligible jobs**
- The user enables auto-apply.
- The agent applies only to jobs that meet all configured conditions.
- The agent respects daily and weekly limits.
- The agent uses verified information and approved documents.
- Exceptions and sensitive questions require user input.

**Mode 3 — Discovery only**
- The agent finds and ranks jobs.
- No applications are submitted.
- The user applies manually.

Make the current mode clearly visible.

### Step 7: Application status tracking

Maintain these statuses:
- Discovered.
- Match evaluated.
- Awaiting information.
- Awaiting approval.
- Ready to submit.
- Submitting.
- Submitted.
- Submission failed.
- Interview.
- Offer.
- Rejected.
- Withdrawn.

Store:
- Job title.
- Company.
- Job URL.
- Match score.
- Resume version.
- Cover letter version.
- Submission timestamp.
- External application ID when available.
- Submission confirmation.
- Current status.
- Error details when submission fails.

Retry failed submissions only when it is safe to do so. Verify the previous submission status before retrying to prevent duplicates.

### Step 8: Auto-Apply activity log

Build an activity log showing:
- Jobs discovered.
- Jobs that passed the match threshold.
- Applications prepared.
- Applications submitted.
- Jobs skipped and why.
- Failed submissions and error explanations.
- Actions requiring user attention.

Provide filters for date, company, match score, and status.

Add a pause button and an emergency stop button that prevent new submissions.

## 9. Cover Letter Generator

Build an AI-powered cover letter feature.

Inputs:
- Job description.
- Selected resume.
- Company name.
- Target role.
- Optional tone preferences.

Outputs:
- Job-specific cover letter.
- Editable text.
- Copy button.
- Save version.
- Download option.

Use only accurate information from the user's verified profile and resume.

## 10. Job Application Tracker

Create a Kanban board with:
- Wishlist.
- Applied.
- Assessment.
- Interview.
- Offer.
- Rejected.

Allow users to:
- Add and edit applications.
- View application details.
- Move cards between stages.
- Add notes and follow-up dates.
- Filter by company, role, status, and date.
- View the job URL and submitted resume.
- See whether an application was submitted manually or by the AI agent.

Include a table view and a Kanban view.

## 11. AI Interview Preparation

Features:
- Select a target job role.
- Choose experience level.
- Generate technical and behavioral interview questions.
- Submit answers using a text editor.
- Receive feedback on clarity, relevance, and completeness.
- View suggested answer structures.
- Track previous practice sessions.
- Identify areas that need additional preparation.

Clearly distinguish practice feedback from actual employer evaluations.

## 12. Analytics Dashboard

Use Recharts to display:
- Applications submitted over time.
- Applications by status.
- Resume match distribution.
- Interview conversion rate.
- Offer rate.
- Most frequently requested skills.
- Auto-apply success and failure counts.

Calculate statistics from real application records. Do not fabricate successful applications or interview outcomes.

## 13. Profile and Settings

Allow users to manage:
- Personal details.
- Contact information.
- Education.
- Work experience.
- Skills.
- Certifications.
- Work authorization.
- Target job preferences.
- Salary preferences.
- Saved resume versions.
- Cover letter templates.
- Notification preferences.
- Auto-apply limits and approval mode.
- Account security and logout.

Treat sensitive information as private and use it only for authorized application purposes.

## 14. Backend and Architecture

Use:
- Node.js.
- Express.js.
- MongoDB.
- An AI API for resume analysis, job matching explanations, cover letters, and interview questions.
- A background job queue for scheduled job discovery and application tasks.
- An authorized job data integration.
- An application-submission adapter for each supported platform.

Keep the React frontend separate from the backend.

Create backend modules for:
- Authentication.
- User profiles.
- Resume processing.
- Job discovery.
- Job matching.
- AI content generation.
- Auto-apply scheduling.
- Application submission.
- Application tracking.
- Notifications.
- Activity logging.

Keep AI API keys and platform credentials on the server. Do not expose them in the frontend.

Use secure session management, server-side validation, authorization checks, request limits, and audit logging.

## 15. Suggested API Endpoints

Authentication:
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

Resumes:
- POST /api/resumes/upload
- GET /api/resumes
- GET /api/resumes/:id/analysis
- POST /api/resumes/:id/analyze

Jobs:
- GET /api/jobs
- GET /api/jobs/:id
- POST /api/jobs/:id/match
- POST /api/jobs/:id/save

Auto-Apply:
- GET /api/auto-apply/settings
- PUT /api/auto-apply/settings
- POST /api/auto-apply/start
- POST /api/auto-apply/pause
- POST /api/auto-apply/stop
- GET /api/auto-apply/activity
- GET /api/auto-apply/queue

Applications:
- GET /api/applications
- POST /api/applications
- GET /api/applications/:id
- PUT /api/applications/:id
- POST /api/applications/:id/approve
- POST /api/applications/:id/submit
- GET /api/applications/:id/status

Interview:
- POST /api/interviews/questions
- POST /api/interviews/feedback
- GET /api/interviews/history

Analytics:
- GET /api/analytics/dashboard

Validate and authorize every endpoint. Never allow a user to access another user's resumes or applications.

## 16. Frontend Project Structure

Use a structure similar to:

src/
  assets/
  components/
    common/
    layout/
    dashboard/
    resume/
    jobs/
    autoApply/
    applications/
    interview/
    analytics/
  pages/
  layouts/
  hooks/
  services/
  context/
  routes/
  utils/
  App.jsx
  main.jsx
  index.css

Create reusable components for:
- Sidebar.
- Header.
- Dashboard cards.
- Match score.
- Resume upload.
- Job cards.
- Application status badges.
- Auto-apply settings.
- Approval dialog.
- Activity log.
- Tables.
- Charts.
- Notifications.
- Loading and error states.

## 17. Mock Mode and Free Development

The frontend must work locally before the backend is ready.

Implement:
- Realistic mock jobs.
- Sample resumes and match results.
- Simulated application preparation.
- Clearly labelled simulated submission results.
- Mock application history.
- Mock AI feedback.

Keep mock services separate from real API services.

Never display a mock application as a real submitted application.

Use free development tools where possible. Live AI services, authorized job integrations, hosting, and application submission providers may have usage limits or costs.

## 18. Testing Requirements

Test:
- Resume upload validation.
- Job match filtering.
- Auto-apply settings.
- Daily and weekly limits.
- Duplicate application prevention.
- Missing information handling.
- Approval and rejection flows.
- Pause and emergency stop.
- Submission failures and retries.
- Authentication and authorization.
- Responsive layouts.
- API errors and loading states.

Use automated tests for critical submission and duplicate-prevention logic.

## 19. Development Order

Build incrementally:

1. Set up React + Vite.
2. Create the responsive layout and routing.
3. Implement the dashboard and mock data.
4. Build resume upload and analysis interfaces.
5. Implement job discovery and matching.
6. Build the Auto-Apply configuration page.
7. Implement application preparation and approval flows.
8. Add the submission adapter interface and mock submission service.
9. Build the application tracker and activity log.
10. Add interview preparation and analytics.
11. Connect the backend and AI API.
12. Integrate one authorized job application provider.
13. Test submission safety, duplicate prevention, and error recovery.
14. Document setup and deployment in README.md.

## 20. Final Deliverables

Provide:
- Complete React source code using JavaScript and JSX.
- Responsive pages and reusable components.
- Working mock mode.
- API service modules.
- Backend integration plan.
- Auto-Apply dashboard and configuration.
- Job matching and application preparation.
- Approval and automated submission flows.
- Activity logs and application history.
- `.env.example`.
- README with setup instructions.
- API endpoint documentation.
- Tests for important workflows.

Start with a polished React frontend and working mock data. Implement the Auto-Apply Agent interface and safety rules before connecting any real application-submission service.

**Final requirement:** The app must never invent job eligibility, user qualifications, or submission confirmations. Automatic submission must be limited to authorized integrations and verified information, with user intervention whenever required.
