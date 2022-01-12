const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  is_done: {
    type: Boolean,
    required: false,
    default: false,
  },
  description: {
    type: String,
    required: false,
    default: "No Description.",
  },
});

module.exports = mongoose.model("project", projectSchema);
