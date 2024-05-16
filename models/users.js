const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const user = new mongoose.model("user", schema);

module.exports = user;
