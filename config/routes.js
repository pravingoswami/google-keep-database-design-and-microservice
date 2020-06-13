const express = require('express')

const router = express.Router()

router.get('/', (req, res) => res.json("Welcome to our microservice of google keep"))

module.exports = router