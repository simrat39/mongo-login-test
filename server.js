const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");
const User = require("./schemas/User.js");

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/tutorria");

  app.use("/css", express.static("./public/css"))
  app.use("/js", express.static("./public/js"))

  // Middleware to parse body data to json
  app.use(express.json())

  app.get("/", async (_, res) => {
    const doc = fs.readFileSync("./public/html/landing.html", "utf-8");
    res.send(doc);
  });

  app.post("/register", async (req, res) => {
    const email = req.body.email;
    const pw = req.body.password;
    const name = req.body.name;

    const existing = await User.find({email: email}).count()

    if (existing == 0) {
        const newUser = await User.create({email: email, password: pw, name: name})
        await newUser.save()
        res.json({status: 'success'});
    } else {
        res.json({status: 'fail', msg: 'User already exists!'})
    }
  });
}

app.listen(8000, main);
