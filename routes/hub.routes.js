const { Router } = require('express')
const { Client } = require('pg')
const db = require('../db')

const hub = require('../middleware/hub.middleware')

const router = Router()

router.get(
    '/friends', 
    hub,
    async (req, res) => {
        try {            
            // const client = new Client({
            //     connectionString,
            // })
            // await client.connect()
            // const result = await client.query(queries.selectFriends(req.userid))            
            // await client.end()            
            const result = await db.myFriends(req.userid)
            const friends = result.rows
            
            return res.json({ friends, message: 'Friends selected.' })
        } catch (e) {
            return res.status(500).json({ message: 'Hub error.' })
        }
    }
)

module.exports = router