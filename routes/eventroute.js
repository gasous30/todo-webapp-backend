const express = require("express");
const event = require("../models/event");
const router = express.Router();
const Event = require("../models/event");

const getEvent = async (req, res, next) => {
  let event;
  try {
    event = await Event.findById(req.params.id);
    if (event == null) {
      return res.status(404).json({ message: "Cannot find event." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.event = event;
  next();
};

//Get All
router.get("/", async (req, res) => {
  try {
    const event = await Event.find();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get One
router.get("/:id", getEvent, (req, res) => {
  res.send(res.event);
});

// Create One
router.post("/", async (req, res) => {
  const event = new Event({
    name: req.body.name,
    issuer: req.body.issuer,
    description: req.body.description,
    time: req.body.time,
  });
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update One
router.patch("/:id", getEvent, async (req, res) => {
  if (req.body.time != null) {
    res.event.time = req.body.time;
  }
  try {
    const updatedEvent = await res.event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete One
router.delete("/:id", getEvent, async (req, res) => {
  try {
    await res.event.remove();
    res.json({ message: "Deleted event." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
