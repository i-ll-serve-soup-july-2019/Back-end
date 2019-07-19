require("dotenv").config();

const server = require("./api/server.js");

const port = process.env.PORT || 7777;
server.listen(port, () =>
  console.log(`\n*** Let's get some soup on port ${port} ***\n`)
);
