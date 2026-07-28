require('dotenv').config()
const cors = require('cors')

const cookieParser = require('cookie-parser')
const errorHandler = require('./middlewares/errorHandler')
const express = require('express')
const path = require('path')
const connectDB = require('./utils/connectDB')
const jwt = require('jsonwebtoken')
const app = express()

const port = process.env.PORT
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname , '../frontend')))
app.use(cookieParser())

//connect to db
connectDB()

//router
const authRouter = require('./routes/authRoutes')
const testRouter = require('./routes/testRoutes')

app.use('/auth' , authRouter)
app.use('/test' , testRouter)
app.get('/login' , (req , res) =>{
    res.sendFile(path.join(__dirname , '../frontend/login.html'))
})
app.get('/register' , (req , res) =>{
    res.sendFile(path.join(__dirname , '../frontend/register.html'))
})
app.get('/profile' , (req , res) =>{
    const {token} = req.cookies
    if(!token){
        return res.redirect('/login')
    }
    try{
        const payload = jwt.verify(token , process.env.JWT_SECRET)
    }catch(error){//توکن معتبر نیست یا تاریخ انقضا گدشته
        return res.redirect('/login')
    }
    res.sendFile(path.join(__dirname , '../frontend/profile.html'))
})

app.use(errorHandler)

app.listen(port , () =>{
    console.log(`app running on port ${port}`)
})