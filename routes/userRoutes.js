const express = require('express')
const router = express.Router();

const {registrationValidation} = require('../validation/userValidation')
const userController = require('../controllers/usersController')

router.post('/register',registrationValidation,userController.register)

module.exports = router;