const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");
const sessions = require("express-session");
const User = require("./schemas/User.js");

async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/tutorria");

  app.use("/css", express.static("./public/css"));
  app.use("/js", express.static("./public/js"));

  // Middleware to parse body data to json
  app.use(express.json());

  app.use(
    sessions({ secret: "tisasecret", saveUninitialized: true, resave: false })
  );

  app.get("/", async (_, res) => {
    const doc = fs.readFileSync("./public/html/landing.html", "utf-8");
    res.send(doc);
  });

  app.get("/profile", async (_, res) => {
    const doc = fs.readFileSync("./public/html/profile.html", "utf-8");
    res.send(doc);
  });

  app.post("/register", async (req, res) => {
    if (req.session.loggedIn) {
      res.json({ status: "fail", msg: "Already logged in!" });
      return;
    }

    const email = req.body.email;
    const pw = req.body.password;
    const name = req.body.name;

    const existing = await User.find({ email: email }).count();

    if (existing == 0) {
      const newUser = await User.create({
        email: email,
        password: pw,
        name: name,
      });
      await newUser.save();
      res.json({ status: "success" });
    } else {
      res.json({ status: "fail", msg: "User already exists!" });
    }
  });

  app.post("/login", async (req, res) => {
    if (req.session.loggedIn) {
      res.json({ status: "fail", msg: "Already logged in!" });
      return;
    }

    const email = req.body.email;
    const pw = req.body.password;

    const users = await User.find({
      email: email,
      password: pw,
    });

    if (users.length == 0) {
      res.json({ status: "fail", msg: "Invalid credentials" });
    } else {
      const user = users.at(0);
      req.session.userID = user._id;
      req.session.loggedIn = true;

      req.session.save(() => {});
      res.json({ status: "success" });
    }
  });
}

app.listen(8000, main);
