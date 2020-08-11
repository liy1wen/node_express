const logger = (req,res,next) => {
    req.message = "你好"
    console.log("自定义中间件")
    next()
}
module.exports = logger