const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  feedback: { type: String, required: true },
  rating: { type: Number, required: true },
  product: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Feedback", feedbackSchema);