const mongoose = require("mongoose");

// Status pipeline: Saved -> Applied -> Interview -> Rejected / Offer
const ApplicationSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  company: { type: String, default: "" },
  status: { type: String, enum: ["Saved", "Applied", "Interview", "Rejected", "Offer"], default: "Saved" },
  notes: { type: String, default: "" },
  link: { type: String, default: "" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Application", ApplicationSchema);
