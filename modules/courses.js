const mongoose = require("mongoose")
const courseSchema = new mongoose.Schema({
    weeks: {
        type: String,
        required: [true, "请填写学习周期"]
    },
    coursename: {
        type: [String],
        required: [true, "请填写学习名称"],
        trim: true,
        enum: ["java", "php", "微信小程序", "ios", "安卓", "web开发", "python"]
    },
    describtion: {
        type: String,
        required: [true, "请填写课程描述"]
    },
    tuition: {
        type: String,
        required: [true, "请填写学习费用"]
    },
    camps: {
        type: mongoose.Schema.ObjectId,
        ref: "CampsModel",
        required: true
    },
    level: {
        type: [String],
        required: [true, "请填写学习级别"],
        enum: ["初级", "中级", "高级"]
    },
    user: {
        type: String
    },
    creatAt: {
        type: String,
        required: false,
        default: new Date().toLocaleString()
    }
})
module.exports = mongoose.model("CourseModel", courseSchema)