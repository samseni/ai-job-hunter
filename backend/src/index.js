require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/resume", require("./routes/resume"));
app.use("/api/ai", require("./routes/ai"));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB if configured, but still start server without it (dev-friendly).
if (MONGO_URI) {
  mongoose.connect(MONGO_URI).then(() => console.log("MongoDB connected")).catch((e) => console.error("Mongo error:", e.message));
} else {
  console.log("No MONGO_URI — running without database (applications API will 503).");
}

app.listen(PORT, () => console.log(`Backend on http://localhost:${PORT}`));
