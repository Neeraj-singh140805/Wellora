const router = require("express").Router();
const auth = require("../middleware/auth");
const Log = require("../models/Log");

router.get("/", auth, async (req, res) => {
  const logs = await Log.find({ userId: req.user });
  res.json(logs);
});

router.post("/", auth, async (req, res) => {
  const log = await Log.create({ ...req.body, userId: req.user });
  res.json(log);
});

router.put("/:id", auth, async (req, res) => {
  const updated = await Log.findByIdAndUpdate(req.params.id, req.body);
  res.json(updated);
});

router.delete("/:id", auth, async (req, res) => {
  await Log.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
