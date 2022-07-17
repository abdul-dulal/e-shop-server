const allProduct = require("express").Router();
const mongoose = require("mongoose");
const todoSchema = require("../models/ProductSchema");
const Todo = new mongoose.model("Todo", todoSchema);
allProduct.post("/test", async (req, res) => {
  const newtodo = new Todo(req.body);
  console.log(newtodo);
  await newtodo.save((err) => {
    if (err) {
      res.status(500).json({ error: "there was a server side err" });
    } else {
      res.status(200).json({
        message: "todo added succesfully",
      });
    }
  });
});

module.exports = allProduct;
