require("dotenv").config();
require("./config/dbConnection")

const express = require('express')
const app = express()

app.listen(5000, () => console.log('Server is running on 5000 port number'))
