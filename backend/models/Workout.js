const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  title: String,
  category: String,
  duration: Number,
  youtubeId: String,
  popularity: Number
});

module.exports = mongoose.model("Workout", WorkoutSchema);
