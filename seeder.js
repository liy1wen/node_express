// 导入本地json数据到数据库
const fs = require("fs")
const mongoose = require("mongoose")
const userModel = require("./modules/user.js")
const courseModel = require("./modules/course.js")
const dotenv = require("dotenv")
const color = require("colors")
dotenv.config({
    path: "./config/config.env"
})
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:true
}) 
const userJson = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`,'utf-8'))
const courseJson = JSON.parse(fs.readFileSync(`${__dirname}/data/course.json`,'utf-8'))
// console.log(dataJson.red)
const importData = async () =>{
    await userModel.create(userJson) 
    await courseModel.create(courseJson)  
    try {
        console.log('导入成功！！！')
    } catch (error) {
        console.log(error)
    } 
}
importData()

