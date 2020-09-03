const usersModel = require('../modules/users.js');

/**
 * @description 注册用户
 * @route POST /api/v2/auth/register
 * @access public
 */
exports.registerCamps = async (req, res, next) => {
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