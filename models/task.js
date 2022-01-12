const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  is_done: {
    type: Boolean,
    required: true,
    default: false,
  },
  issuer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: "No Description.",
  },
});

module.exports = mongoose.model("task", taskSchema);
