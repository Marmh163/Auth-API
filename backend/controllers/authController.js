const registerValidator = require('../validators/registerValidator')
const User = require('../models/User')
const loginValidator = require('../validators/loginValidator')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//register
const register = async (req , res , next) => {
  try{    
    const {email, password, role} = req.body
    
    //validation
    const validationResult = registerValidator(req.body)
    if(validationResult !== true){
        return res.status(422).json(validationResult)
    }
    //check if user exists
    const user = await User.findOne( {email})
        if(user){
            return res.status(409).json([{message : 'این ایمیل قبلا توی دیتابیس ثبت شده', field : 'ایمیل'}])
        }

    //hashed password
    const hashedPassword  = await bcrypt.hash(password , 10)
    await User.create({email, password: hashedPassword, role})

    res.status(201).json([{message : 'ثبت نام با موفقیت انجام شد'}])
    }catch(error){
        next(error)
    }
}


//login
const login = async ( req , res) => {
    try{
        
        const {email, password} = req.body
        
        //validate email&password
        const validationResult = loginValidator(req.body)
        if(validationResult !== true){
            return res.status(422).json(validationResult)
        }
        //check if user exists in db
        const user = await User.findOne( {email})
        if(!user){
            return res.status(404).json([{message : 'یوزری با این ایمیل یافت نشد', field : 'ایمیل'}])
        }
        //compare password with hashed-password
        const isValidPassword = await bcrypt.compare(password , user.password)
        if(!isValidPassword){
            return res.status(401).json([{message : 'پسورد وارد شده صحیح نیست', field : 'پسورد'}])
        }

        //generate token
        const token = jwt.sign({ email : user.email , role : user.role} , process.env.JWT_SECRET , {
            expiresIn : '30min'
        })

        res.status(200).json([{message : 'با موفقیت لاگین شدی', token: token }] )

    }catch(err){
        next(err)
    }
} 


module.exports = {register ,login}