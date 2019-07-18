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

    describe('add item to inventory', () => {
        afterEach( async () => {
            await db ('inventory').truncate()
        })
        it('should add an item to inv w/ a foreign key identifier', async () => {
            const newItem4 ={
                userId:1,
                username:"gettest",
                item:"pickle",
                quantity: 4,
                units:"pieces",
                threshold: 2
            }

            const newItem5 ={
                userId:1,
                username:"gettest",
                item:"banana",
                quantity: 12,
                units:"pieces",
                threshold: 2
            }

            const newItem6 ={
                userId:2,
                username:"gettest2",
                item:"watermelon",
                quantity: 10,
                units:"pieces",
                threshold: 1
            }
            const addedItem4 = Inv.addItem(newItem4)
            const addedItem5 = Inv.addItem(newItem5)
            const addedItem6 = Inv.addItem(newItem6)
    
            const inventoryList = await db('inventory')
    
            expect(inventoryList).toHaveLength(3)
            expect(inventoryList[0].item).toBe(newItem4.item)
            expect(inventoryList[1].quantity).toBe(newItem5.quantity)
            expect(inventoryList[2].units).toBe(newItem6.units)
        })
    })

    // describe('update inventory item', () => {

    // })


})