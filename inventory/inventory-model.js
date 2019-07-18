const db = require('../data/dbConfig.js')

module.exports = {
    getInventory,
    addItem,
    updateItem,
    findBy,
    findById
}

async function getInventory(userId){
    return db('inventory').where({ userId })
}

async function findBy(filter){
    return db('inventory')
}

async function findById(id){
    return db('inventory').where({ id }).first()
}

async function addItem(item){
    const [id] = await db('inventory').insert(item)
    return findById(id)
}

async function updateItem(item){
    return null
}