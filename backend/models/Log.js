const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  workoutId: mongoose.Schema.Types.ObjectId,
  calories: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Log", LogSchema);
