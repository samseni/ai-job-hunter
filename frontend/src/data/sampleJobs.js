// Job data comes from the backend API (GET /api/jobs).
// No hardcoded dummy jobs — empty array until backend responds.
export const sampleJobs = [];

export function getSavedIds() {
  try { return JSON.parse(localStorage.getItem("savedJobs") || "[]"); }
  catch { return []; }
}
