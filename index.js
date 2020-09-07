const express = require("express")
const dotenv = require("dotenv")
const logger = require("morgan")
    // const colors = require("colors")
const db = require("./config/db.js")
const errorHandler = require("./middleware/errorHandler.js")
    // 引入路由
const campsRouter = require("./routes/camps.js")
const coursesRouter = require("./routes/courses.js")
const usersRouter = require("./routes/users.js")
const cookieParser = require("cookie-parser")
    // 引入中间件
dotenv.config({
    path: "./config/config.env"
})

const app = express()
    // body解析
app.use(express.json())
    // 连接数据库
db()
app.use(logger("dev"))
    // 使用cookie中间件
app.use(cookieParser())

// 挂载路由
app.use('/api/v2/camps', campsRouter)
app.use('/api/v2/courses', coursesRouter)
app.use('/api/v2/auth', usersRouter)

//处理请求报错中间件
app.use(errorHandler)

const PORT = process.env.PORT || "3000"
const serve = app.listen(PORT, () => {
    console.log(`服务在端口${PORT}运行`.bgRed)
})
process.on("unhandledRejection", (err, Promise) => {
    console.log(`ERROR:${err.message}`.red.bold)
    serve.close(() => {
        process.exit(1)
    })
})