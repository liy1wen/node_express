const express = require("express")
const router = express.Router()
const {
    findUsers,
    CreatUser,
    RemoveUsers,
    UpdateUser
} = require("../controllers/index.js")
const advancedResults = require("../middleware/advancesResults")
const userModel = require("../modules/user.js")
// 定向路由
const courseRouter = require("./course.js")
router.use("/:userId/courses", courseRouter)

// 查找所有用户
router.route("/getusers").get(advancedResults(userModel, "courses"), findUsers)
// 根据id查找用户
router.route("/getusers/:id").get(findUsers)
// 添加用户
router.route("/creatusers").post(CreatUser)
// 删除单个用户
router.route("/removeusers/:id").delete(RemoveUsers)
// 删除所有用户
router.route("/removeusers").delete(RemoveUsers)
// 更新用户
router.route("/updateusers/:id").put(UpdateUser)
module.exports = router