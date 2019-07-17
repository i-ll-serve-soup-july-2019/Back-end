const db = require('../data/dbConfig.js')
const Inv = require('./inventory-model.js')

describe('inventory model functions', () => {

    describe('get inventory', () => {
        afterEach( async () => {
            await db ('inventory').truncate()
        })
        it('should return items for respective foreign key', async () => {
            const newItem1 ={
                userId:1,
                username:"gettest",
                item:"apple",
                quantity: 22,
                units:"pieces",
                threshold: 2
            }

            const newItem2 ={
                userId:1,
                username:"gettest",
                item:"tomato",
                quantity: 8,
                units:"pieces",
                threshold: 2
            }

            const newItem3 ={
                userId:2,
                username:"gettest2",
                item:"grapefruit",
                quantity: 6,
                units:"pieces",
                threshold: 2
            }

            await db('inventory').insert(newItem1)
            await db('inventory').insert(newItem2)
            await db('inventory').insert(newItem3)

            const userOneInventory = await Inv.getInventory(1)
            const userTwoInventory = await Inv.getInventory(2)

            expect(userOneInventory).toHaveLength(2)
            expect(userOneInventory[0].item).toBe('apple')
            expect(userOneInventory[1].quantity).toBe(8)
            expect(userOneInventory[1].username).toBe(userOneInventory[0].username)
            
            expect(userTwoInventory).toHaveLength(1)
            expect(userTwoInventory[0].item).toBe('grapefruit')
            expect(userTwoInventory[0].threshold).toBe(2)
            expect(userTwoInventory[0].units).toBe("pieces")
        })

    })

    //describe('add item to inventory', () => {

    //})

    // describe('update inventory item', () => {

    // })


})