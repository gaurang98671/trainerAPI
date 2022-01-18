var express = require('express')
var tokenCheck = require('../middlewares/tokenCheck')
const {getExercises, postExercise, updateExercise} = require("../controllers/exerciseController")

const exercise = express.Router()
exercise.use(tokenCheck)
exercise.route("/").get(getExercises).post(postExercise).put(updateExercise)

module.exports = exercise