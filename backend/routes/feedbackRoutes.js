const express = require("express");
const Feedback = require("../models/Feedback");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/submit", async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    const io = req.app.get("socketio");
    io.emit("feedback_update", {});
    res.status(201).json({ message: "Feedback submitted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/all", authMiddleware, async (req, res) => {
  const feedbacks = await Feedback.find();
  res.json(feedbacks);
});

router.get("/stats", authMiddleware, async (req, res) => {
  const feedbacks = await Feedback.find();
  const total = feedbacks.length;
  const avgRating = (
    feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / total
  ).toFixed(2);

  const productStats = {};
  feedbacks.forEach((fb) => {
    if (!productStats[fb.product]) productStats[fb.product] = { count: 0, sum: 0 };
    productStats[fb.product].count++;
    productStats[fb.product].sum += fb.rating;
  });

  const popularity = Object.entries(productStats).map(([product, val]) => ({
    product,
    avgRating: (val.sum / val.count).toFixed(2),
    total: val.count,
  }));

  res.json({ total, avgRating, popularity });
});

module.exports = router;
