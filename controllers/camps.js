const CampsModel = require("../modules/camps.js")
    // const ErrorResponse = require("../utils/errorResponse.js")
    /**
     * @description 根据id查询用户信息
     * @route GET /api/v2/getcamps/:id
     * @access public
     */
    // exports.findCamps = async (req, res, next) => {
    //     try {
    //         const user = await CampsModel.findById(req.params.id)
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
     * @route GET /api/v2/getcamps
     * @access public
     */
exports.findCamps = async(req, res, next) => {
    try {
        // 判断是否有id,有id表示查找单个,没有表示查找所有或者按条件查找
        if (req.params.id) {
            const camps = await CampsModel.findById(req.params.id)
            res.status("200").json({
                success: true,
                data: camps
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
 * @route POST /api/v2/creatcamps
 * @access private
 */
exports.CreatCamps = async(req, res, next) => {
        try {
            const camps = await CampsModel.create(req.body)
            res.status("200").json({
                success: true,
                data: camps
            })
        } catch (error) {
            next(error)
        }
    }
    // 删除单个用户
    // exports.RemoveUser = async (req, res, next) => {
    //     try {
    //         const camps = await CampsModel.findByIdAndRemove(req.params.id)
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
exports.RemoveCamps = async(req, res, next) => {
        try {
            // 判断是否有删除id,有表示删除单个，没有表示删除所有
            if (req.params.id) {
                const camps = await CampsModel.findById(req.params.id)
                camps.remove()
            } else {
                const camps = await CampsModel.remove()
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
exports.UpdateCamps = async(req, res, next) => {
    try {
        const camps = await CampsModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status("200").json({
            success: true,
            data: camps
        })
    } catch (error) {
        next(error)
    }
}