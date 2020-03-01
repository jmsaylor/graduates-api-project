const express = require("express");
const router = express.Router();
const { Grad } = require("../../models/grad");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  let grads = await Grad.find();
  res.send(grads);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  let grad = new Grad({
    name: req.body.name,
    gradDate: req.body.gradDate,
    review: req.body.review
  });
  try {
    await grad.save();
    res.send(grad);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    let deleted = await Grad.findByIdAndRemove(req.params.id);
    res.send(deleted);
  } catch (error) {
    console.error(error);
  }
});

router.patch("/:id", async (req, res) => {
  console.log(req.body);
  try {
    await Grad.findByIdAndUpdate(req.params.id, req.body, { new: true });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
