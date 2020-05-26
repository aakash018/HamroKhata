const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  person: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  currentTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Enter", entrySchema);
