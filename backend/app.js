const dotenv = require('dotenv');
dotenv.config();

const express = require("express")
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const userRouter = require('./routes/user.routes')


app.use('/api/v1/users',userRouter)


module.exports = app;