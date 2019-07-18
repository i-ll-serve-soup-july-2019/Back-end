const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const inventoryRouter = require("../config/routers/inventoryRouter.js");
const userAccountsRouter = require("../config/routers/userAccountsRouter.js");

const server = express();

function logger(req, res, next) {
  const { path } = req;
  const timeStamp = Date.now();
  const log = { path, timeStamp };
  console.log(`${req.method} Request`, log);
  next();
}

server.use(logger);
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send("Server alive");
});

server.use("/api/inventory", inventoryRouter);
server.use("/api/useraccounts", userAccountsRouter);

module.exports = server;
