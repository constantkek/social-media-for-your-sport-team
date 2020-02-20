const { Pool } = require('pg')
const config = require('config')
const connectionString = config.get('connectionStringPg')
const pool = new Pool({
    connectionString
})

const selectUsers = async () => {
    const result = await pool.query('SELECT * FROM Users')
    return result.rows
}

const insertUser = async (user) => {
    const fields = Object.keys(user).join(', ')
    const values = Object.values(user).join(', ')
    const res = await pool.query(`INSERT INTO Users(${fields}) VALUES (${values});`)
    return res.rows.length === 0 ? null : res
}

const myFriends = async (id) => { 
    console.log(id);
       
    const res = await pool.query(`
    SELECT u1.username as me, u2.username as friend, u2.userid
    FROM ((Friends AS f
        INNER JOIN Users AS u1 
        ON f.userid2 = ${id} AND u1.userid = ${id})
            INNER JOIN Users AS u2
            ON f.userid1 = u2.userid)
    UNION
    SELECT u1.username as me, u2.username as friend, u2.userid
    FROM ((Friends AS f
        INNER JOIN Users AS u1 
        ON f.userid1 = ${id} AND u1.userid = ${id})
            INNER JOIN Users AS u2
            ON f.userid2 = u2.userid)
    `)
    console.log(res);
    
    return res.rows.length === 0 ? null : res
}

const selectUsersWhereID = async (id) => {
    const res = await pool.query(`SELECT * FROM Users WHERE userid = ${id}`)
    return res.rows
}

module.exports = { selectUsers, insertUser, myFriends, selectUsersWhereID }