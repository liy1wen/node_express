const express = require("express");
const router = express.Router({ mergeParams: true });
// 引入控制器
const {
  getReviews,
  getReview,
  updateReview,
  deleteReview,
  addReview,
} = require("../controllers/reviews.js");

// 路由鉴权
const { protect, authorize } = require("../middleware/auth.js");

const advancedResults = require("../middleware/advancedResults.js");
const Review = require("../models/Review.js");

// http://localhost:5000/api/v1/reviews
router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "mscamp",
      select: "name description",
    }),
    getReviews
  )
  .post(protect, authorize("admin", "user"), addReview);

router
  .route("/:id")
  .get(getReview)
  .put(protect, authorize("admin", "user"), updateReview)
  .delete(protect, authorize("admin", "user"), deleteReview);

module.exports = router;
