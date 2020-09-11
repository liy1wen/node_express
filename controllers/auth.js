const ErrorResponse = require('../utils/errorResponse')
const usersModel = require('../modules/users.js');

/**
 * @description 注册用户
 * @route POST /api/v2/auth/register
 * @access public
 */
exports.registerCamps = async(req, res, next) => {
    try {
        const users = await usersModel.create(req.body)
        sendCookieResponse(users, 200, res)
    } catch (error) {
        next(error)
    }
}

/**
 * @description 用户登录
 * @route POST /api/v2/auth/login
 * @access public
 */
exports.loginCamps = async(req, res, next) => {
    try {
        const {
            password,
            email
        } = req.body;
        if (!password || !email) {
            return next(new ErrorResponse('请输入完整登录信息', '404'))
        }
        // console.log(email, password);
        // 现根据登录的邮箱信息进行查询用户，如果查不到登录用户则返回错误
        const users = await usersModel.findOne({
            email
        })
        if (!users) {
            return next(new ErrorResponse('用户不存在', '404'))
        }
        // 查到有登录用户后，在进行密码匹配，只有密码匹配成功才算登陆成功
        const matchPassword = await users.checkPassword(password)
        if (!matchPassword) {
            return next(new ErrorResponse('密码错误', '403'))
        }
        // 获取加密之后的token
        sendCookieResponse(users, 200, res)
    } catch (error) {
        next(error)
    }
}

// 将token存到cookie
const sendCookieResponse = (users, statusCode, res) => {
    const token = users.getAsignedJwtToken()
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    if (process.env.NODE_ENV == "production") {
        options.secure = true
    }
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        // data: users,
        token
    })
}