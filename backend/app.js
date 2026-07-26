require('dotenv').config()
const cors = require('cors')

const errorHandler = require('./middlewares/errorHandler')
const express = require('express')
const connectDB = require('./utils/connectDB')
const app = express()

const port = process.env.PORT
app.use(cors())
app.use(express.json())

//connect to db
connectDB()

//router
const authRouter = require('./routes/authRoutes')
const testRouter = require('./routes/testRoutes')

app.use('/auth' , authRouter)
app.use('/test' , testRouter)

app.use(errorHandler)

app.listen(port , () =>{
    console.log(`app running on port ${port}`)
})