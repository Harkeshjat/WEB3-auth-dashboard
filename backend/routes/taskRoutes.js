// backend/routes/taskRoutes.js
import express from "express";
import { Task } from "../models/Task.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// sabse pehle middleware
router.use(protect);

// @route   GET /api/tasks
// query: ?search=text&status=pending
router.get("/", async (req, res) => {
  try {
    const { search, status } = req.query;

    const query = { user: req.user._id };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (status && status !== "all") {
      query.status = status;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/tasks
router.post("/", async (req, res) => {
  try {
    const { title, status } = req.body;
    if (!title)
      return res.status(400).json({ message: "Title is required" });

    const task = await Task.create({
      user: req.user._id,
      title,
      status: status || "pending"
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/tasks/:id
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title ?? task.title;
    task.status = req.body.status ?? task.status;

    const updated = await task.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE /api/tasks/:id
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
