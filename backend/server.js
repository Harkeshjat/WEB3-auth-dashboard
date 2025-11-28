// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();

const app = express();

// middlewares
app.use(express.json());

// CORS: frontend origin allow
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

// basic health check
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// main routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// error handler (fallback)
app.use((err, req, res, next) => {
  console.error("Error middleware:", err);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
