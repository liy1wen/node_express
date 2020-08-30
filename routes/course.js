const express = require("express")
const router = express.Router({
    mergeParams: true
})
const {
    // findCourse,
    findCourses,
    CreatCourse,
    RemoveCourses,
    // RemoveCourse,
    UpdateCourse
} = require("../controllers/course.js")
// 查找所有课程
router.route('/').get(findCourses)
// 根据id查找课程
// router.route('/getcourses/:id').get(findCourse)
// 添加课程
router.route('/creatcourses').post(CreatCourse)
// 删除所有课程
router.route('/removecourses').delete(RemoveCourses)
// 删除单个用户
// router.route('/removecourses/:id').delete(RemoveCourse)
// 更新课程
router.route('/updatecourses/:id').put(UpdateCourse)
module.exports = router