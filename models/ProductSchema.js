const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
});
module.exports = todoSchema;
