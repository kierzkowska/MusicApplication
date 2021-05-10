const router = require("express").Router();
const auth = require("../middleware/auth");
const Score = require("../models/scoreModel");

router.post("/", auth, async (req, res) => {
  try {
    // const { scoreText, date } = req.body;

    const newScore = new Score({
      scoreText: req.body.scoreText,
      user_id: req.user,
    });
    //  console.log(req.user);
    const savedScore = await newScore.save();
    res.json(savedScore);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", async (req, res) => {
  Score.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("blad: ", daerrorta);
    });
});
router.get("/one", auth, async (req, res) => {
  try {
    // res.json({ user_id: req.user.id });
    const scores = await Score.find({ user_id: req.user });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.get("/:user_id", (req, res) => {
  Score.find({ user_id: req.params.user_id }, (err, items) => {
    if (err) res.status(500).send(error);

    res.status(200).json(items);
  });
});
module.exports = router;
