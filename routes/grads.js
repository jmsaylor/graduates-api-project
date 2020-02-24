const express = require("express");
const router = express.Router();
const { Grad } = require("../models/grad");
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

router.delete("/", async (req, res) => {});

router.patch("/", async (req, res) => {});

module.exports = router;
