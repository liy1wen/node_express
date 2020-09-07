const express = require("express")
const router = express.Router()
const auth = require('../middleware/auth.js')
const {
    registerCamps,
    loginCamps
} = require("../controllers/auth.js")

router.route(auth, '/register').post(registerCamps) //注册
router.route('/login', loginCamps) //登录
module.exports = router