const userModel = require("../modules/user.js")
    // const ErrorResponse = require("../utils/errorResponse.js")
    // 根据id查找单个
exports.findUser = async(req, res, next) => {
        try {
            const user = await userModel.findById(req.params.id)
            res.status("200").json({ success: true, data: user })
        } catch (error) {
            next(error)
        }
    }
    // 查找所有
exports.findUsers = async(req, res, next) => {
    try {
        const reqQuery = {...req.query }
        const keyword = ["select", "sort", "page", "limit"]
        keyword.forEach(item => delete reqQuery[item])
        let queryStr = JSON.stringify(reqQuery)
        queryStr = queryStr.replace(/\b(gt|lt|gte|lte|in)\b/g, (match) => `$${match}`);
        let user = userModel.find(JSON.parse(queryStr))
        if (req.query.select) {
            user = user.select(req.query.select.split(",").join(" "))
        }
        // 排序，默认时间倒序
        if (req.query.sort) {
            user = user.sort(req.query.sort.split(",").join(" "))
        } else {
            user = user.sort("-creatAt")
        }
        // 分页
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        // const total = user.countDocuments()
        console.log(user.countDocument(), "++++");
        // user.skip(startIndex).limit(limit)
        user = await user;
        res.status("200").json({ success: true, count: user.length, data: user })
    } catch (error) {
        next(error)
    }
}

// 创建用户
exports.CreatUser = async(req, res, next) => {
        try {
            const user = await userModel.create(req.body)
            res.status("200").json({ success: true, data: user })
        } catch (error) {
            next(error)
        }
    }
    // 删除单个用户
exports.RemoveUser = async(req, res, next) => {
        try {
            const user = await userModel.findByIdAndRemove(req.params.id)
            res.status("200").json({ success: true, data: {} })
        } catch (error) {
            // res.status("400").json({message:'fail',data: error})
            next(error)
                // next(new ErrorResponse("这里是报错信息",400))
        }
    }
    // 删除所有用户
exports.RemoveUsers = async(req, res, next) => {
        try {
            const user = await userModel.remove()
            res.status("200").json({ success: true, data: {} })
        } catch (error) {
            // res.status("400").json({message:'fail',data: error})
            next(error)
                // next(new ErrorResponse("这里是报错信息",400))
        }
    }
    // 更新用户
exports.UpdateUser = async(req, res, next) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.status("200").json({ success: true, data: user })
    } catch (error) {
        next(error)
    }
}