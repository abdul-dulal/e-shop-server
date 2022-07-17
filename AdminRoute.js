const express = require("express");

const adminRoute = express.Router();

adminRoute.get("/login", (req, res) => {
  res.send("hello from router");
});
module.exports = adminRoute;
