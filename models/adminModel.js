const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true, minlength: 5 },
  displayName: { type: String },
});

module.exports = Admin = mongoose.model("admin", adminSchema);
