const mongoose = require("mongoose")
const campsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "请填写姓名"],
        unique: true,
        maxlength: [4, "名字不能超过4个字"]
    },
    age: {
        type: Number,
        required: [true, "请填写年龄"]
    },
    sex: {
        type: String,
        required: [true, "请填写性别"]
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^1(3|4|5|6|7|8|9)\d{9}$/, "请填写正确的手机号"]
    },
    creatAt: {
        type: String,
        required: false,
        default: new Date().toLocaleString()
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})
// 配置virtuals,关联course数据表
campsSchema.virtual("courses", {
    ref: "CourseModel",
    localField: "_id",
    foreignField: "camps",
    justOne: false
})
// 配置前置钩子，连带删除
campsSchema.pre("remove", async function (next) {
    await this.model("CourseModel").deleteMany({
        camps: this._id
    })
    next()
})

module.exports = mongoose.model("CampsModel", campsSchema)