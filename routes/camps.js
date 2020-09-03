const express = require("express")
const router = express.Router()
const {
    findCamps,
    CreatCamps,
    RemoveCamps,
    UpdateCamps
} = require("../controllers/camps.js")
const advancedResults = require("../middleware/advancesResults")
const campsModel = require("../modules/camps.js")
    // 定向路由
const courseRouter = require("./courses.js")
router.use("/:userId/courses", courseRouter)

// 查找所有用户
router.route("/getcamps").get(advancedResults(campsModel, "courses"), findCamps)
    // 根据id查找用户
router.route("/getcamps/:id").get(findCamps)
    // 添加用户
router.route("/creatcamps").post(CreatCamps)
    // 删除单个用户
router.route("/removecamps/:id").delete(RemoveCamps)
    // 删除所有用户
router.route("/removecamps").delete(RemoveCamps)
    // 更新用户
router.route("/updatecamps/:id").put(UpdateCamps)
module.exports = router