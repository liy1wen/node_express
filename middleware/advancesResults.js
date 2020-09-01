const advancedResults = (model, populate) => async (req, res, next) => {
    const reqQuery = {
        ...req.query
    }
    const keyword = ["select", "sort", "page", "limit"]
    keyword.forEach(item => delete reqQuery[item])
    let queryStr = JSON.stringify(reqQuery)
    queryStr = queryStr.replace(/\b(gt|lt|gte|lte|in)\b/g, (match) => `$${match}`);
    let query = model.find(JSON.parse(queryStr))
    // 根据select查询
    if (req.query.select) {
        query = query.select(req.query.select.split(",").join(" "))
    }
    // 排序，默认时间倒序
    if (req.query.sort) {
        query = query.sort(req.query.sort.split(",").join(" "))
    } else {
        query = query.sort("-creatAt")
    }
    // 分页
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // const total = await query.countDocuments();
    // console.log(total)
    const total = 100;
    query.skip(startIndex).limit(limit)
    const pagination = {}
    if (startIndex > 0) {
        pagination.pre = {
            page: page - 1,
            limit
        }
    }
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    let results
    if (populate) {
        results = await query.populate(populate);
    } else {
        results = await query;
    }
    res.advancedResults = {
        success: true,
        count: results.length,
        pagination,
        data: results,
        total
    }
    next()
}
module.exports = advancedResults