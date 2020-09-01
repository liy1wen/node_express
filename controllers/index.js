const userModel = require("../modules/user.js")
// const ErrorResponse = require("../utils/errorResponse.js")
/**
 * @description 根据id查询用户信息
 * @route GET /api/v2/getuser/:id
 * @access 公开的
 */
// exports.findUser = async (req, res, next) => {
//     try {
//         const user = await userModel.findById(req.params.id)
//         res.status("200").json({
//             success: true,
//             data: user
//         })
//     } catch (error) {
//         next(error)
//     }
// }
/**
 * @description 获取所有用户信息列表
 * @route GET /api/v2/getusers
 * @access public
 */
exports.findUsers = async (req, res, next) => {
    try {
        // 判断是否有id,有id表示查找单个,没有表示查找所有或者按条件查找
        if (req.params.id) {
            const user = await userModel.findById(req.params.id)
            res.status("200").json({
                success: true,
                data: user
            })
        } else {
            res.status("200").json(res.advancedResults)
        }

    } catch (error) {
        next(error)
    }
}

// 创建用户
/**
 * @description 创建用户
 * @route POST /api/v2/creatusers
 * @access 公开的
 */
exports.CreatUser = async (req, res, next) => {
    try {
        const user = await userModel.create(req.body)
        res.status("200").json({
            success: true,
            data: user
        })
    } catch (error) {
        next(error)
    }
}
// 删除单个用户
// exports.RemoveUser = async (req, res, next) => {
//     try {
//         const user = await userModel.findByIdAndRemove(req.params.id)
//         res.status("200").json({
//             success: true,
//             data: {}
//         })
//     } catch (error) {
//         // res.status("400").json({message:'fail',data: error})
//         next(error)
//     }
// }
// 删除所有用户
exports.RemoveUsers = async (req, res, next) => {
    console.log(req.params.id);
    try {
        // 判断是否有删除id,有表示删除单个，没有表示删除所有
        if (req.params.id) {
            const user = await userModel.findById(req.params.id)
            user.remove()
        } else {
            const user = await userModel.remove()
        }
        res.status("200").json({
            success: true,
            data: {}
        })
    } catch (error) {
        // res.status("400").json({message:'fail',data: error})
        next(error)
    }
}
// 更新用户
exports.UpdateUser = async (req, res, next) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status("200").json({
            success: true,
            data: user
        })
    } catch (error) {
        next(error)
    }
}