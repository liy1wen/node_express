const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "请添加评论主题"],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, "请添加评论内容"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "请评分, 范围是1~10"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  mscamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Mscamp",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
