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

const login = (req,res) => {
	// const errors = registrationValidation(req);

	// if(!errors.isEmpty()){
	// 	return res.status(450).json({errors:errors.array()});
	// }

	db.query(
		`SELECT * FROM registeration WHERE email = ${db.escape(req.body.email)};`,
		(errors,result) => {
			if(errors) {
				return res.status(451).send({
					msg : 'Email or password is incorrect!'
				});

			}

			if(!result.length) {
				return res.status(452).send({
					msg : 'Email or Password is incorrect!'
				});
			}

			bcrypt.compare(
				req.body.password,
				result[0]['password'],
				(bErrors,bResult) => {
					if(bErrors){
						return res.status(453).send({
							msg : 'Email or Password is incorrect!'
						});
					}
					if (bResult) {
						const token = jwt.sign({ id: result[0]['id'] }, JWT_SECRET, { expiresIn: '1h' });
						return res.status(200).send({
							msg : "LoggedIn",
							token,
							user : result[0]
						});	
					}
					
					return res.status(454).send({
						msg : "Email or Password is incorrect!"
					});				
				}
				
			)
		}
	)
}

module.exports = {
    register,
	login
}