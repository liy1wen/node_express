const express = require("express")
const router = express.Router()

const {
    registerCamps
} = require("../controllers/auth.js")

router.route('/register').post(registerCamps)
module.exports = router