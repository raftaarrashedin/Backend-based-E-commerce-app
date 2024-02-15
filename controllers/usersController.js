const {registrationValidation} = require('express-validator')
const bcrypt = require('bcryptjs')
const db = require('../config/dbConnection')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env

const register = (req,res) => {

	// const errors = registrationValidation(req);

	// if(!errors.isEmpty()){
	// 	return res.status(400).json({errors : errors.array()})
	// }

	db.query(
			`SELECT * FROM registeration WHERE LOWER(email) = LOWER(${db.escape(
				req.body.email
			)});`,

			(errors,result) => {
				if(result && result.length){
					return res.status(401).send({
						msg: 'This user is already in use!'
					});
				}else{
					bcrypt.hash(req.body.password, 10, (errors, hash) => {
						if(errors){
							return res.status(402).send({
								msg : 'Kia baat h ye, kiu nh hora insert',
								msg : errors
							})
						}else{
							db.query(
								`INSERT INTO registeration(name,email,password,mobile_no) VALUES(
									'${req.body.name}',
									${db.escape(req.body.email)},
									${db.escape(hash)},
									'${req.body.mobile_no}'
								);`,
								(errors,result) => {
									if(errors) {
										return res.status(403).send({
											msg : errors
										})
									}
									return res.status(500).send({
										msg : 'Successfully, you have registered!'
									})
								}
							)
						}
					})
				}
			}
		)

}

module.exports = {
    register
}