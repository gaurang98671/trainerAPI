const express = require('express')
const {login, signup} = require("../controllers/authController")
const auth = express.Router()

auth.route("/login").post(login)
auth.route("/signup").post(signup)

module.exports = auth