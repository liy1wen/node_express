// 导入本地json数据到数据库
const fs = require("fs")
const mongoose = require("mongoose")
const campsModel = require("./modules/camps.js")
const coursesModel = require("./modules/courses.js")
const dotenv = require("dotenv")
const color = require("colors")
dotenv.config({
    path: "./config/config.env"
})
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
})
const userJson = JSON.parse(fs.readFileSync(`${__dirname}/data/camps.json`, 'utf-8'))
const courseJson = JSON.parse(fs.readFileSync(`${__dirname}/data/courses.json`, 'utf-8'))
    // console.log(dataJson.red)
const importData = async() => {
    await campsModel.create(userJson)
    await coursesModel.create(courseJson)
    try {
        console.log('导入成功！！！')
    } catch (error) {
        console.log(error)
    }
}
importData()