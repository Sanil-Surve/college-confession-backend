const express = require("express");
const router = express.Router();
const { upload } = require("../utils/cloudinary");
const Confession = require("../models/Confession");

// Create a new confession
// router.post("/", async (req, res) => {
//   const { text, imageUrl } = req.body;
//   try {
//     const newConfession = new Confession({ text, imageUrl });
//     await newConfession.save();
//     res.status(201).json(newConfession);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Create a new confession with an image
router.post("/", upload.single("image"), async (req, res) => {
  const { text } = req.body;
  const imageUrl = req.file?.path || null; // Get the Cloudinary URL
  try {
    const newConfession = new Confession({ text, imageUrl });
    await newConfession.save();
    res.status(201).json(newConfession);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all confessions (sorted by upvotes)
router.get("/", async (req, res) => {
  try {
    const confessions = await Confession.find().sort({ upvotes: -1 });
    res.json(confessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vote on a confession (upvote or downvote)
router.put("/:id/vote", async (req, res) => {
  const { type } = req.body; // 'upvote' or 'downvote'
  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) return res.status(404).json({ error: "Confession not found" });

    if (type === "upvote") confession.upvotes += 1;
    if (type === "downvote") confession.downvotes += 1;

    await confession.save();
    res.json(confession);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a confession
router.delete("/:id", async (req, res) => {
  try {
    const confession = await Confession.findByIdAndDelete(req.params.id);
    if (!confession) return res.status(404).json({ error: "Confession not found" });
    res.json({ message: "Confession deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;