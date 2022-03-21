var express = require('express')
var tokenCheck = require('../middlewares/tokenCheck')
const {getExercises, postExercise, updateExercise, getAllExercises} = require("../controllers/exerciseController")
const {getPendingExercises, postUserSuccess, updateReps} = require('../controllers/userSuccessController')
const exercise = express.Router()
exercise.route("/").get(tokenCheck, getExercises).post(postExercise).put(updateExercise)
exercise.route("/getAll").get(getAllExercises)
exercise.route("/getPending").get(tokenCheck, getPendingExercises)
exercise.route("/postUserSuccess").post(tokenCheck, postUserSuccess)
exercise.route("/updateReps").put(tokenCheck, updateReps)
module.exports = exercise