const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  issuer: {
    type: String,
    required: true,
  },
  time: {
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
