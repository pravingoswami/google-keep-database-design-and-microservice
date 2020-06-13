const express = require('express')

const authenticateUser = require("../app/middlewares/authenticateUser")

const userController = require("../app/controllers/userController")

const router = express.Router()

router.post('/user/register', userController.register)
router.post('/user/login', userController.login)
router.get('/user/info', authenticateUser, userController.userInfo)
router.put('/user/edit', authenticateUser, userController.editUser)
router.delete('/user/logout', authenticateUser, userController.logout)


module.exports = router