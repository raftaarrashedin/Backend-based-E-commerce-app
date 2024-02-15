require("dotenv").config();
require("./config/dbConnection")

const express = require('express')
const app = express()

const userRouter = require('./routes/userRoutes')

const cors = require('cors')

const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use('/api',userRouter)

// Error Handling
app.use((errors,req,res,next) => {
	errors.statusCode = errors.statusCode || 500;
	errors.message = errors.message || "Internal Server Error";
	res.status(errors.statusCode).json({
		message : errors.message
	});
})
app.listen(5000, () => console.log('Server is running on 5000 port number'))
