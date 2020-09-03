const courseModel = require('../modules/courses.js');
const campsModel = require('../modules/camps.js')
const color = require('colors');

/**
 * @description 获取userid查询课程列表，有userid返回userid关联的一条课程数据，没有userid返回所有的课程数据
 * @route GET /api/v2/user/:userId/getcourses
 * @access public
 */
exports.findCourses = async(req, res, next) => {
    try {
        if (req.params.userId) {
            const course = await courseModel
                .find({
                    camps: req.params.userId,
                })
                .populate({
                    // 只返回关联user的name和city字段
                    path: 'camps',
                    select: 'name city',
                });
            res.status('200').json({
                success: true,
                count: course.length,
                data: course,
            });
        } else {
            res.status('200').json(res.advancedResults)
        }
    } catch (error) {
        next(error);
    }
};

/**
 * @description 创建课程
 * @route POST /api/v2/user/:userId/creatcourses
 * @access private
 */
exports.CreatCourse = async(req, res, next) => {
    let user = await campsModel.findById(req.params.userId)
        // 根据userid没有查到用户信息，返回错误
    if (!user) return next(error);
    // 查到有用户，则向用户添加课程数据
    const course = await courseModel.create(req.body);
    res.status('200').json({
        success: true,
        data: course,
    });

};

/**
 * @description 根据id删除课程
 * @route POST /api/v2/course/:id
 * @access private 
 */
exports.RemoveCourses = async(req, res, next) => {
    try {
        // if (req.params.id) {
        //根据id删除课程
        const course = await courseModel.findByIdAndRemove(req.params.id);
        // }
        res.status('200').json({
            success: true,
            data: {},
        });
    } catch (error) {
        next(error);
    }
};
/**
 * @description 更新课程
 * @route POST /api/v2/course/:id
 * @access private
 */
exports.UpdateCourse = async(req, res, next) => {
    try {
        const course = await courseModel.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true,
                runValidators: true,
            }
        );
        res.status('200').json({
            success: true,
            data: course,
        });
    } catch (error) {
        next(error);
    }
};