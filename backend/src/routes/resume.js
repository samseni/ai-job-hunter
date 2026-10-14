const router = require("express").Router();
const multer = require("multer");
const { PDFParse } = require("pdf-parse");

// In-memory upload, 5MB limit, PDFs only.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, file.mimetype === "application/pdf"),
});

// POST /api/resume/upload — extracts text from a PDF resume.
router.post("/upload", upload.single("resume"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Upload a PDF file as 'resume'." });
  try {
    const parser = new PDFParse({ data: req.file.buffer });
    const result = await parser.getText();
    res.json({ text: result.text.slice(0, 20000), pages: result.pages });
  } catch (e) {
    res.status(500).json({ error: "Could not parse PDF." });
  }
});

module.exports = router;
