const express = require("express")
const router = express.Router({
    mergeParams: true
})
const {
    findCourses,
    CreatCourse,
    RemoveCourses,
    UpdateCourse
} = require("../controllers/courses.js")
const advancedResults = require("../middleware/advancesResults")
const courseModel = require("../modules/courses.js")
    // 查找和添加课程
router.route('/').get(advancedResults(courseModel, {
        path: 'camps',
        select: 'name city',
    }), findCourses).post(CreatCourse)
    // 删除和更新课程单个用户
router.route('/:id').delete(RemoveCourses).put(UpdateCourse)
module.exports = router