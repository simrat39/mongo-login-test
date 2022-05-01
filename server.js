const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/tutorria");

  app.get("/", async (_, res) => {
    const doc = fs.readFileSync("./public/html/landing.html", "utf-8");
    res.send(doc);
  });
}

app.listen(8000, main);
