// 路由鉴权,请求接口路由前，判断headers里面是否有token，再拿token去解密查询是否有该用户
const usersModel = require('../modules/users.js');
const jwt = require('jsonwebtoken');
const users = require('../modules/users.js');
const auth = async(req, res, next) => {
    // 判断是否有token
    let token;
    if (req.headers.Authorization && req.headers.Authorization.startWith("Bearer")) {
        token = req.headers.Authorization.split(" ")[1];
    }
    if (!token) return next()
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        req.user = await users.findById(decoded.id)
    } catch (error) {
        return next()
    }
}
module.exports = auth