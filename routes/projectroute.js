const express = require("express");
const router = express.Router();
const Project = require("../models/project");

const getProject = async (req, res, next) => {
  let project;
  try {
    project = await Project.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({ message: "Cannot find project." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.project = project;
  next();
};

// Get All
router.get("/", async (req, res) => {
  try {
    const project = await Project.find();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get One
router.get("/:id", getProject, (req, res) => {
  res.send(res.project);
});

// Create One
router.post("/", async (req, res) => {
  const project = new Project({
    category: req.body.category,
    name: req.body.name,
    is_done: req.body.is_done,
    description: req.body.description,
  });
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update One
router.patch("/:id", getProject, async (req, res) => {
  if (req.body.is_done != null) {
    res.project.is_done = req.body.is_done;
  }
  try {
    const updatedProject = await res.project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete One
router.delete("/:id", getProject, async (req, res) => {
  try {
    await res.project.remove();
    res.json({ message: "Deleted project." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
