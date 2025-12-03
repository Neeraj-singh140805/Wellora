const router = require("express").Router();
const auth = require("../middleware/auth");
const Workout = require("../models/Workout");

router.get("/", auth, async (req, res) => {
  const { search, category, sort, page = 1, limit = 50 } = req.query;

  let query = {};

  if (search) {
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    query.title = { $regex: escapedSearch, $options: "i" };
  }
  if (category) query.category = category;

  let workouts = Workout.find(query);

  if (sort === "popularity") workouts = workouts.sort({ popularity: -1 });
  if (sort === "duration") workouts = workouts.sort({ duration: 1 });

  const results = await workouts
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(results);
});

module.exports = router;
