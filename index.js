const express = require('express')
const setupDB = require('./config/setupDB')
const router = require("./config/routes")
require('dotenv').config()

const app = express()

const port = 3041

setupDB()
app.use(express.json())
app.use('/', router)

app.listen(port, () => {
    console.log('listenong on port', port)
})
