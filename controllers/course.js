const courseModel = require('../modules/course.js');
const color = require('colors');
/**
 * @description 根据id查询课程
 * @route GET /api/v2/getCourses/:id
 * @access 公开的
 */
exports.findCourse = async (req, res, next) => {
    try {
        const course = await courseModel.findById(req.params.id);
        res.status('200').json({
            success: true,
            data: course,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @description 获取所有课程列表
 * @route GET /api/v2/user/:userId/getcourses
 * @access 公开的
 */
exports.findCourses = async (req, res, next) => {
    try {
        let course;
        // console.log(req.params.userId);
        if (req.params.userId) {
            course = await courseModel
                .find({
                    users: req.params.userId,
                })
                .populate({
                    // 只返回关联user的name和city字段
                    path: 'users',
                    select: 'name city',
                });
        } else {
            // course = await courseModel.find().populate("users") //返回关联的user里面所有数据
            course = await courseModel.find().populate({
                // 只返回关联user的name和city字段
                path: 'users',
                select: 'name city',
            });
        }
        res.status('200').json({
            success: true,
            count: course.length,
            data: course,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @description 创建课程
 * @route POST /api/v2/creatcourses
 * @access 公开的
 */
exports.CreatCourse = async (req, res, next) => {
    try {
        const course = await courseModel.create(req.body);
        res.status('200').json({
            success: true,
            data: course,
        });
    } catch (error) {
        next(error);
    }
};
// /**
//  * @description 根据id删除课程
//  * @route POST /api/v2/removecourses/:id
//  * @access 公开的
//  */
// exports.RemoveCourse = async (req, res, next) => {
//     try {
//         const course = await courseModel.findByIdAndRemove(req.params.id)
//         res.status("200").json({
//             success: true,
//             data: {}
//         })
//     } catch (error) {
//         next(error)
//     }
// }
/**
 * @description 删除所有课程课程
 * @route POST /api/v2/removecourses
 * @access 公开的
 */
exports.RemoveCourses = async (req, res, next) => {
    try {
        if (req.params.id) {
            //根据id删除课程
            const course = await courseModel.findByIdAndRemove(req.params.id);
        } else {
            //删除所有课程课程
            const course = await courseModel.remove();
        }
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
 * @route POST /api/v2/updatecourses/:id
 * @access 公开的
 */
exports.UpdateCourse = async (req, res, next) => {
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