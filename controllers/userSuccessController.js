const userSuccessModel = require("../models/success")
const userModel = require("../models/user_data_model")
const exercise = require('../models/exercise')

exports.postUserSuccess = async (req, res) => {
    try{
        const userId = req.userId
        const exerciseId = req.body.exerciseId
        const repsDone = req.body.repsDone
        const startedOn = req.body.startedOn
        const user = await userModel.find({"userId" : userId})
        const exerciseObj = await exercise.find({"_id" : exerciseId})

        if(user.length == 0){
            res.status(404).json({
                "message" : "User not found"
            })
            return
        }

        if(exerciseObj.length == 0){
            res.status(404).json({
                "message" : "Exercise not found"
            })
            return
        }
        if(!repsDone || !startedOn){
            res.status(401).json({
                "message" : "Repsdone or started on missing"
            })
            return 
        }

        //TODO change this
        //const totalReps = exerciseObj[0].totalReps
        const totalReps = req.body.totalReps

        const userSuccess = await userSuccessModel.create({
            "userId" : userId,
            "exerciseId" : exerciseId,
            "startedOn" : startedOn,
            "totalReps" : totalReps,
            "repsDone" : repsDone
        }) 
        res.status(200).json(userSuccess)
   }
    catch(e){
        console.log(e)
        res.status(500).json({
            "message" : "Internal server error"
        })
    }
}

exports.updateReps = async (req, res) => {
    try{
        const successId = req.body.successId   
        const repsDone = req.body.repsDone
        const successObj = await userSuccessModel.find({"_id" : successId})
        const userId = req.userId
        console.log(userId)
        console.log(successObj)
        if(!repsDone){
            res.status(400).json({
                "message" : "Missing reps done"
            })
        }
        if(userId !== successObj[0].userId){
            res.status(401).json({
                "message" : "Unauthorized user"
            })
            return 
        }
        if(successObj.lenght == 0){
            res.status(404).json({
                "message" : "Success obj not found"
            })
            return 
        }

        await userSuccessModel.findOneAndUpdate({"_id" : successId}, {$set : { repsDone : repsDone}})
        const userSuccessObj = await userSuccessModel.find({"_id" : successId})
        res.status(200).json(userSuccessObj)
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            "message" : "Internal server error"
        })
    }
}

exports.getPendingExercises = async (req, res) => {
    try{
        const userId = req.userId
        console.log("Fetching pending exercises for userId", userId)
        var user = await userModel.find({"userId" : userId})
        if(user.length == 0){
            res.status(404).json({
                "message" : "User not found"
            })
        }
        else{
            console.log("Fetching pending exercises")
            const pendingExercises = await userSuccessModel.find({"userId" : userId, $expr : { $lt : ['$repsDone', '$totalReps']}}) 
            let pendingExercisesResults = []
            console.log("Generating results")
            for(i=0;i<pendingExercises.length;i++){
                
                var exerciseId = pendingExercises[i].exerciseId
                console.log("Fetching exerciseId", exerciseId)
                var exercise = await exercise.find({"_id" : exerciseId})
                var exerciseResultObject = {...exercise}
                exerciseResultObject.repsDone = pendingExercises[i].repsDone
                exerciseResultObject.startedOn = pendingExercises[i].startedOn
                console.log("Pushing exercise to list")
                pendingExercisesResults.at.push(exerciseResultObject)
            }

            res.status(200).json(pendingExercisesResults)
        }
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            "message" : "Internal server error"
        })
    }
}