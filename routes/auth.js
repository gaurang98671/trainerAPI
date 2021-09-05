const express = require('express')
const {login, signup, refreshToken} = require("../controllers/authController")
const auth = express.Router()

auth.route("/login").post(login)
auth.route("/signup").post(signup)
auth.route("/token").post(refreshToken)
module.exports = auth

//login token 5:00 -> 6:00
//get exe -> 6:10 -> /token  old token-> new_token