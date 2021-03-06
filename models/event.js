const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  issuer: {
    type: String,
    required: true,
  },
  started_at: {
    type: Date,
    required: true,
  },
  end_at: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: "No description.",
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("event", eventSchema);
