const express = require("express");
const router = express.Router();
const Watchlist = require("../models/watchlist");

const getWatchlist = async (req, res, next) => {
  let watchlist;
  try {
    watchlist = await Watchlist.findById(req.params.id);
    if (watchlist == null) {
      return res.status(404).json({ message: "Cannot find watchlist." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.watchlist = watchlist;
  next();
};

//Get All
router.get("/", async (req, res) => {
  try {
    const watchlist = await Watchlist.find();
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get One
router.get("/id/:id", getWatchlist, (req, res) => {
  res.send(res.watchlist);
});

// Get by Category
router.get("/category/:category", async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ category: req.params.category });
    res.send(watchlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create One
router.post("/", async (req, res) => {
  const watchlist = new Watchlist({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    is_watched: req.body.is_watched,
    place: req.body.place,
  });
  try {
    const newWatchlist = await watchlist.save();
    res.status(201).json(newWatchlist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update One
router.patch("/:id", getWatchlist, async (req, res) => {
  if (req.body.is_watched != null) {
    res.watchlist.is_watched = req.body.is_watched;
  }
  try {
    const updatedWatchlist = await res.watchlist.save();
    res.json(updatedWatchlist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete One
router.delete("/:id", getWatchlist, async (req, res) => {
  try {
    await res.watchlist.remove();
    res.json({ message: "Deleted watchlist." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
