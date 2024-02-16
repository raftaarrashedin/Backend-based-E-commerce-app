const express = require('express')
const router = express.Router();

const {registrationValidation,loginValidation} = require('../validation/userValidation')
const userController = require('../controllers/usersController')

router.post('/register',registrationValidation,userController.register)
router.post('/login',loginValidation,userController.login)

module.exports = router;