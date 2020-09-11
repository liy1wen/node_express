const ErrorResponse = require('../utils/errorResponse')
const CampsModel = require("../modules/camps.js")
    /**
     * @description 获取所有camps
     * @route GET /api/v2/camps/getcamps
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

/**
 * @description 创建camps
 * @route POST /api/v2/camps/creatcamps
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
    /**
     * @description 删除camps
     * @route Delete /api/v2/camps/removecamps
     * @access private
     */
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
            next(error)
        }
    }
    /**
     * @description 更新camps
     * @route Put /api/v2/camps/updatecamps/id
     * @access private
     */
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