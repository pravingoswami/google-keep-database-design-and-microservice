const express = require('express')

const userController = require("../app/controllers/userController")

const router = express.Router()

router.post('/user/register', userController.register)
router.post('/user/login', userController.login)


module.exports = router