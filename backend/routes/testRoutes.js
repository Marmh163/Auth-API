const express = require('express')
const router = express.Router()

//middleware
const {isAuthenticated , isAdmin} = require('../middlewares/auth')

router.get('/about' ,  (req , res) =>{
    res.send('</h1>About Page - free for evereone </h1>')
})

router.get('/profile' , isAuthenticated ,(req , res) =>{
    const {email , role}= req.user
    res.send(`</h1>Welcome to Profile - ${email} - ${role}</h1>`)
})

router.get('/admin' , isAuthenticated , isAdmin , (req , res)=>{
    res.send('<h1>Admin Panel</h1>')
} )

module.exports = router