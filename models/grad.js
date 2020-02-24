const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gradDate: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  }
});

let Grad = mongoose.model("Grad", schema);

exports.Grad = Grad;
