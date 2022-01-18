const express = require('express')
const {login, signup, refreshToken} = require("../controllers/authController")
const auth = express.Router()

auth.route("/login").post(login)
auth.route("/signup").post(signup)
auth.route("/token").get(refreshToken)
module.exports = auth