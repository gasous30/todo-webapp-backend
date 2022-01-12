const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  is_watched: {
    type: Boolean,
    required: false,
    default: false,
  },
  description: {
    type: String,
    required: false,
    default: "No Description.",
  },
  place: {
    type: String,
    required: false,
    default: "-",
  },
});

module.exports = mongoose.model("watchlist", watchlistSchema);
