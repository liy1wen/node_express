const usersModel = require('../modules/users.js');

/**
 * @description 注册用户
 * @route POST /api/v2/auth/register
 * @access public
 */
exports.registerCamps = async(req, res, next) => {
    try {
        const users = await usersModel.create(req.body)
        const token = users.getAsignedJwtToken()
        res.status("200").json({
            success: true,
            data: users,
            token
        })
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
        const { password, email } = req.body;
        if (!password || !email) {
            return next(error)
        }
        // console.log(email);
        // 现根据登录的邮箱信息进行查询用户，如果查不到登录用户则返回错误
        const users = await usersModel.findOne({ email })
        console.log(users);
        if (!users) {
            return next(error)
        }
        // 查到有登录用户后，在进行密码匹配，只有密码匹配成功才算登陆成功
        const matchPassword = users.checkPassword(password)
        console.log(matchPassword);
        if (!matchPassword) {
            return next(error)
        }
        // 获取加密之后的token
        const token = users.getAsignedJwtToken()
        res.status("200").json({
            success: true,
            data: users,
            token
        })
    } catch (error) {
        next(error)
    }
}