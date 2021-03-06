const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"请填写姓名"],
        unique: true,
        maxlength:[4,"名字不能超过4个字"]
    },
    age: {
        type: Number,
        required:[true,"请填写年龄"]
    },
    sex: {
        type:String,
        required:[true,"请填写性别"]
    },
    hobbies:{
        type:[String],
        required:true,
        enum:["篮球","足球","游戏","电影","爬山","看书","音乐"]
    },
    phone:{
        type:String,
        required:true,
        unique: true,
        match:[/^1(3|4|5|6|7|8|9)\d{9}$/,"请填写正确的手机号"]
    },
    city:{
        type:String,
        required:false
    },
    creatAt:{
        type:String,
        required:false,
        default: new Date().toLocaleString()
    }
})
module.exports = mongoose.model("UserModel",userSchema)