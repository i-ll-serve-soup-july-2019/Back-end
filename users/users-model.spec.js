const db = require('../data/dbConfig.js')
const Users = require('./users-model.js')

describe('users model functions', () => {
    
    describe('addUser function', () => {
        afterEach( async () => {
            await db ('users').truncate()
        })

        it('should add new user to the db', async () => {
            const newUser1 = {
                name:"new1",
                email:"new1@user.com",
                username:"newUser1",
                password:"password",
                role:"test"
            }

            await Users.addUser(newUser1)
            const userList = await db('users')

            expect(userList).toHaveLength(1)
            expect(userList[0].name).toBe(newUser1.name)
            expect(userList[0].email).toBe(newUser1.email)
            expect(userList[0].username).toBe(newUser1.username)
            expect(userList[0].role).toBe(newUser1.role)
            //bcrypt hash password in endpoint
        })
    })

})