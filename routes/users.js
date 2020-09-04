const express = require("express")
const router = express.Router()

const {
    registerCamps,
    loginCamps
} = require("../controllers/auth.js")

router.route('/register').post(registerCamps)
router.route('/login').post(loginCamps)
module.exports = router