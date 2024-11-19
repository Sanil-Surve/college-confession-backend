const mongoose = require("mongoose");

const ConfessionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  imageUrl: { type: String, default: null }, // Cloudinary URL
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }, // Auto-generated timestamp
});

module.exports = mongoose.model("Confession", ConfessionSchema);