const express = require("express");
const knex = require("knex");
const server = express();
const bcrypt = require("bcryptjs");
const knexConfig = require("../../knexfile.js");
const db = knex(knexConfig.development);
const middleware = require("../middleware.js");
const generateToken = middleware.generateToken;

server.post("/register", (req, res) => {
  const newUser = req.body;

  newUser.password = bcrypt.hashSync(newUser.password, 14);
  if (newUser.id) {
    res.status(400).json({
      error:
        "Please do not include the ID number in the registration. The system auto-generates them"
    });
  } else {
    db("users")
      .insert(newUser)
      .then(ids => {
        res.status(201).json({
          message: `User ${newUser.username} has been successfully registered`,
          userID: ids[0]
        });
      })
      .catch(err => {
        res.status(500).json({
          err,
          message: "There has been an error on the Register POST endpoint"
        });
      });
  }
});

server.post("/login", (req, res) => {
  const newUser = req.body;

  db("users")
    .where({ username: newUser.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(newUser.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: user.username,
          token: token,
          userId: newUser.userId,
          username: newUser.username
        });
      } else {
        res.status(401).json({
          message: "Incorrect username and/or password."
        });
      }
    })
    .catch(err =>
      res.status(500).json({
        err,
        message: "There has been an error on the Login"
      })
    );
});

module.exports = server;
