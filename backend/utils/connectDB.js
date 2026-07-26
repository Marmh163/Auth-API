const mongoose = require('mongoose')

module.exports = async function connectDB(){
    try{
        if(mongoose.connections[0].readyState){
            return
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected to db successfully!')

    }
    catch(err){
        console.log(err.message)
    }
}