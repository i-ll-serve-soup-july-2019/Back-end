const db = require("../data/dbConfig.js");

module.exports = {
  hubs: {
    getInventory,
    addItem,
    updateItem,
    findBy,
    findById
  }
};

async function getInventory(userId) {
  return db("inventory").where({ userId });
}

async function findBy(filter) {
  return db("inventory");
}


async function updateItem(item) {
  return null;
}
