const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    scoreText: {
      type: String,
      required: false,
    },
    user_id: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Score = mongoose.model("Score", scoreSchema);
