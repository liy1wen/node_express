// const ErrorResponse = require("../utils/errorResponse.js")
const errorHandler = (err,req,res,next) => {
    console.log(err.name.red)
    let message,statusCode
    // 查询、更新、删除的id有误
    if(err.name == "CastError") {
        message = `Resource not found with id of ${err.value}`
        statusCode = 404
        // err = new ErrorResponse(message,404)
    }
    // 重复添加
    if(err.name == "MongoError") {
        message = `${err.keyValue[Object.keys(err.keyValue)[0]]}已存在,请勿重复添加`;
        // err = new ErrorResponse(message,400)
        statusCode = 400
    }
    // 校验错误
    if(err.name == "ValidationError") {
        message = Object.values(err.errors).map(item => item.message)
        statusCode = 400
        // err = new ErrorResponse(message,400)
    }
    res.status(statusCode || 500).json({success:false,message: message || "Serve Error"})
}
module.exports = errorHandler
