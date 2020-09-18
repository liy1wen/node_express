const express = require("express");
const router = express.Router();
// 引入控制器
const {
  getMscamps,
  createMscamp,
  getMscamp,
  updateMscamp,
  deleteMscamp,
} = require("../controllers/mscamps.js");

// 路由鉴权  &&  用户角色权限控制
const { protect, authorize } = require("../middleware/auth.js");

const advancedResults = require("../middleware/advancedResults.js");
const Mscamp = require("../models/Mscamp.js");

// 定向路由
const courseRouter = require("./courses.js");
router.use("/:mscampId/courses", courseRouter);

const reviewRouter = require("./reviews.js");
router.use("/:mscampId/reviews", reviewRouter);

// http://localhost:5000/api/v1/mscamps
router
  .route("/")
  .get(advancedResults(Mscamp, "courses"), getMscamps)
  .post(protect, authorize("admin", "user"), createMscamp);

// http://localhost:5000/api/v1/mscamps/:id
router
  .route("/:id")
  .get(getMscamp)
  .put(protect, authorize("admin", "user"), updateMscamp)
  .delete(protect, authorize("admin", "user"), deleteMscamp);

module.exports = router;
