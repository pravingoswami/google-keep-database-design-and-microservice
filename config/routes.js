const express = require('express')

const userController = require("../app/controllers/userController")

const router = express.Router()

router.post('/user/register', userController.register)


module.exports = router