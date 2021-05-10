const router = require("express").Router();
const Music = require("../models/musicModel");

router.post("/", async (req, res) => {
  try {
    const { title, author, link } = req.body;

    const newMusic = new Music({
      title,
      author,
      link,
    });
    const savedMusic = await newMusic.save();
    res.json(savedMusic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", async (req, res) => {
  Music.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("blad: ", daerrorta);
    });
});

module.exports = router;
