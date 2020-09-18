const express = require("express");
const router = express.Router();
// 引入控制器
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.js");

// 路由鉴权
const { protect, authorize } = require("../middleware/auth.js");

const advancedResults = require("../middleware/advancedResults.js");
const User = require("../models/User.js");

router.use(protect);
router.use(authorize("admin"));

// http://localhost:5000/api/v1/auth/users
router.route("/").get(advancedResults(User), getUsers).post(createUser);

// http://localhost:5000/api/v1/users/:id
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
