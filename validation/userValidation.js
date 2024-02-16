const {check} = require('express-validator')

exports.registrationValidation = [
		check('name','Name is required').not().isEmpty(),
		check('email','Enter Valid email').isEmail().normalizeEmail({gmail_remove_dots:true}),
		check('password','Password is required').isLength({min:6}),
		check('mobile_no','Enter 10 digit mobile no').not().isEmpty()
	]

exports.loginValidation = [
	check('email','please enter email').isEmail().normalizeEmail({gmail_remove_dots:true}),
	check('password','Please enter password').isLength({min:6}) 
]