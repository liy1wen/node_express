const colors = require("colors")
const mongoose = require("mongoose");
const db = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify:true
    }) 
    console.log(connect.connection.host.bgBlue)
} 

module.exports = db 