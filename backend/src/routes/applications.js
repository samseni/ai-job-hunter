const router = require("express").Router();
const mongoose = require("mongoose");
const Application = require("../models/Application");

const dbReady = (res) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({ error: "Database not configured. Set MONGO_URI in backend/.env." });
    return false;
  }
  return true;
};

router.get("/", async (req, res) => {
  if (!dbReady(res)) return;
  res.json(await Application.find().sort({ date: -1 }));
});

router.post("/", async (req, res) => {
  if (!dbReady(res)) return;
  const app = await Application.create(req.body);
  res.status(201).json(app);
});

router.patch("/:id", async (req, res) => {
  if (!dbReady(res)) return;
  res.json(await Application.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/:id", async (req, res) => {
  if (!dbReady(res)) return;
  await Application.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
