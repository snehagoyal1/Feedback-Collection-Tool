const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const connectDB = require("./config/db");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

// ✅ Health check route
app.get("/", (req, res) => {
  const msg = "✅ Feedback API is running!";
  console.log(msg); // Console log
  res.send(msg);    // Show in browser
});

app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);

// Socket connection
io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

// Make io accessible in routes
app.set("socketio", io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
