const express = require("express");
const app = express();
const mongoose = require("mongoose");

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/tutorria");
}

app.listen(8000, main);
