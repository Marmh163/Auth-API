const jwt = require('jsonwebtoken')
// exports.isAuthenticated = (req , res , next)=>{
//     let token = req.headers.authorization

//     if(!token == undefined){ //token vojud nadare
//         console.log('not any token')
//         return res.status(401).json({message:'توکن ارسال نشده'})//chun return dare baghie codeha ejra nemishan
//     }

//     try{
//         token = token.split(" ")[1]
//         console.log(token)
//         const payload = jwt.verify(token , process.env.JWT_SECRET)
//         req.user = payload
//         next()

//     }catch(error){//توکن معتبر نیست یا تاریخ انقضا گدشته
//         res.status(401).json({message : 'توکن ارسال شده معتبر نیست'})
//     }

// }

exports.isAuthenticated = (req , res , next)=>{
    let {token} = req.cookies
    
    if(!token){ //token vojud nadare
        return res.redirect('/login')
    }
    try{
        const payload = jwt.verify(token , process.env.JWT_SECRET)
        req.user = payload
        next()

    }catch(error){//توکن معتبر نیست یا تاریخ انقضا گدشته
        return res.redirect('/login')
    }

}

exports.isAdmin = (req , res , next)=>{
    if(req.user.role != 'admin'){
        res.status(403).json({message:'این روت مخصوص ادمین است'})
    }
    next()
}