const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: { type: String, required: true },
  link: { type: String, required: true },
});

module.exports = Music = mongoose.model("adminMusic", musicSchema);
