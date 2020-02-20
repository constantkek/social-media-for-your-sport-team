const { Router } = require('express')
const { Client } = require('pg')
const { check, validationResult } = require('express-validator')
const config = require('config')
const bcrypt = require('bcrypt')
const queries = require('../queries')
const db = require('../db')

const router = Router()
const connectionString = config.get('connectionStringPg')

// done
router.post(
    '/reg', 
    [
        check('username', 'Username required').notEmpty(),
        check('firstname', 'Firstname required').notEmpty(),
        check('lastname', 'Lastname required').notEmpty(),
        check('password', 'Short password').isLength({ min: 4 })
    ], 
    async (req, res) => {
    try {
        // const client = new Client({
        //     connectionString,
        // })
        // await client.connect()
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid registration'
            })
        }
        // const selRes = await client.query(queries.select('users'))
        const selRes = await db.selectUsers()

        const { username, password, firstname, lastname } = req.body
        const exists = selRes.find((element) => {
            if (element.username === username) {
                return true
            }
            return false
        })
        if (exists) {
            return res.status(400).json({ message: 'Exists' })
        } else {
            const hashedPassword = await bcrypt.hash(password, 5)
            const user = {
                lastname: `\'${lastname}\'`, 
                firstname: `\'${firstname}\'`, 
                hashedpassword: `\'${hashedPassword}\'`, 
                username: `\'${username}\'`
            }
            // await client.query(queries.insert('users', user))
            await db.insertUser(user)
            // await client.end()
            return res.status(201).json({ message: 'Created', user })
        }
    } catch (e) {
        res.status(500).json({ message: 'Server error' })
    }
})

router.post(
    '/login', 
    [
        check('username', 'Username required').notEmpty(),
        check('password', 'Short password').isLength({ min: 4 })
    ], 
    async (req, res) => {
    try {
        // const client = new Client({
        //     connectionString,
        // })
        // await client.connect()
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid login',
                errors: errors.array()
            })
        }        
        // const selRes = await client.query(queries.select('users'))
        const selRes = await db.selectUsers()
        const { username, password } = req.body
        const dbUser = selRes.find((elem) => {
            if (elem.username === username) {
                return true
            }
            return false
        })        
        if (!dbUser) {
            return res.status(400).json({ message: 'Not Exists' })
        }
        const isMatch = await bcrypt.compare(password, dbUser.hashedpassword)
        if (!isMatch) {
            return res.status(400).json({ message: 'Password Not Matches' })
        }
        const user = {
            userID: dbUser.userid, 
            username, 
            hashedPassword: dbUser.hashedpassword, 
            firstname: dbUser.firstname, 
            lastname: dbUser.lastname
        }
        // await client.end()
        return res.json({ ...user, message: 'Entered' })
    } catch (e) {
        return res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router