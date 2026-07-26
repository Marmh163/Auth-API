const errorHandler = (err , req , res , next) => {
    console.log('error handling middleware')
    res.status(500).json({messaged : 'خطایی در سمت سرور رخ داده'})
}

module.exports = errorHandler