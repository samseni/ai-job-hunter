const router = require("express").Router();

// No dummy jobs. Returns empty list until a legitimate job API is configured.
// Frontend shows an empty state in this case (never fake results).
router.get("/", (req, res) => {
  res.json([]);
});

module.exports = router;
