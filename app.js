const express = require('express')
const config = require('config')
// const connectionString = config.get('connectionStringPg')
const PORT = config.get('port') || 5000
const app = express()

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/hub', require('./routes/hub.routes'))

async function start() {
    try {
        app.listen(PORT, () => console.log('APP HAS BEEN STARTED.'))
    } catch (e) {
        console.log('Server error: ', e.message)
        process.exit(1)
    }
}

start();