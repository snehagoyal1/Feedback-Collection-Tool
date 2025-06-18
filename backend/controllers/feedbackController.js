const Feedback = require("../models/Feedback");
const calculateStats = require("../utils/statsCalculator");

exports.submitFeedback = async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    const io = req.app.get("socketio");
    io.emit("feedback_update", {});
    res.status(201).json({ message: "Feedback submitted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllFeedback = async (req, res) => {
  const feedbacks = await Feedback.find();
  res.json(feedbacks);
};

exports.getStats = async (req, res) => {
  const feedbacks = await Feedback.find();
  const stats = calculateStats(feedbacks);
  res.json(stats);
};
