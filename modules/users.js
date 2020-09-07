const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const usersSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "请填写姓名"],
            unique: true,
            maxlength: [4, "名字不能超过4个字"]
        },
        email: {
            type: String,
            unique: true,
            required: [true, "请填写邮箱"],
            match: [/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/, "请填写正确的邮箱"]
        },
        password: {
            type: String,
            required: [true, "请填写密码"],
            minlength: 5,
            // select: false
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "visitor"]
        },
        creatAt: {
            type: String,
            required: false,
            default: new Date().toLocaleString()
        }
    })
    // 加密密码
usersSchema.pre("save", async function(next) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    })
    // 生成token
usersSchema.methods.getAsignedJwtToken = function() {
        return jwt.sign({
            id: this._id,
            name: this.name
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        })
    }
    // 对登录密码进行校验
usersSchema.methods.checkPassword = async function(loginPassword) {
    return await bcrypt.compareSync(loginPassword, this.password)
}
module.exports = mongoose.model("UsersModel", usersSchema)