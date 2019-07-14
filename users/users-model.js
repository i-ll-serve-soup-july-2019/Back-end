const db = require('../data/dbConfig.js')

module.exports = {
    addUser,
    findUserBy,
    findUserById
    }


async function findUserBy(filter){
    return db('users').where(filter)
}

async function findUserById(id) {
    return db('users').where({ id }).first()
}

async function addUser(user){
    const [id] = await db('users').insert(user)
    return findUserById(id)
}