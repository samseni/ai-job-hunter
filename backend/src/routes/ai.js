const router = require("express").Router();

// Calls OpenRouter (OpenAI-compatible) with a free model.
// If OPENROUTER_API_KEY is missing, returns 503 — frontend shows a clear notice.
async function chat(messages) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return null;
  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "meta-llama/llama-3-8b-instruct:free", messages }),
  });
  const data = await r.json();
  return data.choices?.[0]?.message?.content || "";
}

// POST /api/ai/match { resumeText, jobDescription }
router.post("/match", async (req, res) => {
  const { resumeText = "", jobDescription = "" } = req.body;
  if (!resumeText || !jobDescription) return res.status(400).json({ error: "resumeText and jobDescription are required." });
  const out = await chat([
    { role: "system", content: "Reply ONLY with JSON: {\"score\":0-100,\"matchedSkills\":[],\"missingSkills\":[],\"explanation\":\"...\"}" },
    { role: "user", content: `Resume:\n${resumeText.slice(0, 6000)}\n\nJob:\n${jobDescription.slice(0, 6000)}` },
  ]);
  if (out === null) return res.status(503).json({ error: "AI not configured. Set OPENROUTER_API_KEY in backend/.env." });
  try { return res.json(JSON.parse(out.match(/\{[\s\S]*\}/)[0])); }
  catch { return res.json({ score: 0, matchedSkills: [], missingSkills: [], explanation: out.slice(0, 1000) }); }
});

// POST /api/ai/suggest { resumeText } → [{ title, description }]
router.post("/suggest", async (req, res) => {
  const { resumeText = "" } = req.body;
  if (!resumeText.trim()) return res.status(400).json({ error: "resumeText is required." });
  const out = await chat([
    { role: "system", content: "Reply ONLY with JSON array of 3 objects: [{\"title\":\"...\",\"description\":\"2-3 sentence role summary with key skills\"}]. Base the roles on the resume skills." },
    { role: "user", content: `Resume:\n${resumeText.slice(0, 6000)}` },
  ]);
  if (out === null) return res.status(503).json({ error: "AI not configured. Set OPENROUTER_API_KEY in backend/.env." });
  try { return res.json(JSON.parse(out.match(/\[[\s\S]*\]/)[0])); }
  catch { return res.status(502).json({ error: "AI returned an unreadable response. Try again." }); }
});
// POST /api/ai/cover-letter { resumeText, jobTitle, company, jobDescription }
router.post("/cover-letter", async (req, res) => {
  const { resumeText = "", jobTitle = "", company = "", jobDescription = "" } = req.body;
  if (!jobTitle || !jobDescription) return res.status(400).json({ error: "jobTitle and jobDescription are required." });
  const out = await chat([
    { role: "system", content: "Write a concise tailored cover letter draft (under 300 words)." },
    { role: "user", content: `Job: ${jobTitle} at ${company}\n${jobDescription.slice(0, 4000)}\n\nResume:\n${resumeText.slice(0, 4000)}` },
  ]);
  if (out === null) return res.status(503).json({ error: "AI not configured. Set OPENROUTER_API_KEY in backend/.env." });
  res.json({ draft: out });
});

module.exports = router;
