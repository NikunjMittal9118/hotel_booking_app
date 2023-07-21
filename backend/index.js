import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from "cors"
const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5174'
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

dotenv.config();

import authRouter from './routes/auth.js'
import hotelsRouter from './routes/hotels.js'
import roomsRouter from './routes/rooms.js'
import usersRouter from './routes/users.js'


// connection request 
mongoose.connect(process.env.DB_URL).then(res => console.log('Connected to Database'))
.catch(err => console.log(`error in the connection is  : ${err}`))


// midllewares for requests
app.use('/api/hotels',hotelsRouter) 
app.use('/api/auth',authRouter)
app.use('/api/rooms',roomsRouter)
app.use('/api/users',usersRouter)

//middleware for error
app.use((err,req,res,next)=>{
    const errMessage = err.message || "Something went wrong"
    const errStatus = err.status || 500
    res.status(errStatus).json({
        success : false,
        status : errStatus,
        message : errMessage,
        stack : err.stack
    })
})

app.listen(9000,()=>{
    console.log("Server Started")
})






