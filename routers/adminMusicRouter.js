const router = require("express").Router();
const adminMusic = require("../models/adminMusic");

router.post("/", async (req, res) => {
  try {
    const { title, author, link } = req.body;

    const newMusic = new adminMusic({
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

router.delete("/delete", async (req, res) => {
  adminMusic
    .remove({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("blad: ", daerrorta);
    });
});

router.get("/all", async (req, res) => {
  adminMusic
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("blad: ", daerrorta);
    });
});

module.exports = router;
