const express = require("express");
const router = express.Router();
const Task = require("../models/task");

const getTask = async (req, res, next) => {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: "Cannot find task." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.task = task;
  next();
};

// Get All
router.get("/", async (req, res) => {
  try {
    const task = await Task.find();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get One
router.get("/:id", getTask, (req, res) => {
  res.send(res.task);
});

// Create One
router.post("/", async (req, res) => {
  const task = new Task({
    category: req.body.category,
    deadline: req.body.deadline,
    name: req.body.name,
    is_done: req.body.is_done,
    issuer: req.body.issuer,
    description: req.body.description,
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update One
router.patch("/:id", getTask, async (req, res) => {
  if (req.body.deadline != null) {
    res.task.deadline = req.body.deadline;
  }
  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete One
router.delete("/:id", getTask, async (req, res) => {
  try {
    await res.task.remove();
    res.json({ message: "Deleted task." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
