const express = require("express");
const router = express.Router({ mergeParams: true });
// 引入控制器
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses.js");

// 路由鉴权
const { protect, authorize } = require("../middleware/auth.js");

const advancedResults = require("../middleware/advancedResults.js");
const Course = require("../models/Course.js");

// http://localhost:5000/api/v1/courses
router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "mscamp",
      select: "name description",
    }),
    getCourses
  )
  .post(protect, authorize("admin", "user"), addCourse);

// http://localhost:5000/api/v1/courses/:id
router
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("admin", "user"), updateCourse)
  .delete(protect, authorize("admin", "user"), deleteCourse);

module.exports = router;
