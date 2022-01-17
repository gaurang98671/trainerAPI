const express = require('express')
const tokenCheck = require('../middlewares/tokenCheck')
const {getUserProfile, postUserProfile} = require("../controllers/userProfileController")
const profile = express.Router()

profile.use(tokenCheck)

profile.route('/').get(getUserProfile).post(postUserProfile)
module.exports = profile