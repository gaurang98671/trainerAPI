const exerciseModel = require("../models/exercise")
const userModel = require("../models/user_data_model")
/** 
 * TODOS
 * Add middleware to check if admin for postEx
 * Handle model file and uploat to object storage
 * */
exports.getExercises = async (req, res) => {
    try{
        const userId = req.userId
        console.log("used id", userId)
        var user = await userModel.find({"userId" : userId})
        console.log(user)
        if(user.length == 0){
            console.log("user not found")
            res.status(404).json({
                "message" : "user not found"
            })
        }
        else{
            user  = user[0]
            if(!user.userIssues){
                console.log("no user issues")
                var exercises = await exerciseModel.find(function(err, document){
                    if(err){
                        res.status(500).json({
                            "message": "error occured",
                            "error" : e
                        })
                    }
                    else{
                        res.status(200).json(document)
                    }
                })

                
            }
            else{
                console.log("user issues")
                var exercises = await exerciseModel.find({'exerciseIssues' : {"$nin" : user.userIssues}})
                res.status(200).json(exercises)
            }
        }
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            "message" : "internal server error",
            "error" : e
        })
    }
}

exports.getAllExercise = async(req, res) => {
    try{
        exercises = await exerciseModel.find()
        res.status(200).json(exercises)
    }
    catch(e){
        res.status(500).json({
            "message" : "Internal server error",
            "err" : e
        })
    }
}
exports.postExercise = async (req, res) => {
    try{
        const {exerciseName, muscleGroup, exerciseDifficulty, exerciseModelPath} = req.body

        if(!exerciseName || !muscleGroup || !exerciseDifficulty || !exerciseModelPath){
            res.status(401).json({
                "message" : "exerciseName or muscleGroup or exerciseDifficulty or exerciseModelPath is missing"
            })
        }
        else{
        
            const exerciseObj = {...req.body}
            console.log("exercise", exerciseObj)
            exerciseModel.create(exerciseObj, function(err, doc){
                console.log("create callback")
                if(err){
                    console.log(err)
                    res.status(500).json({
                        "error" : err
                    })
                }
                else{
                    res.status(200).json(doc)
                }
            })
            
        }
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            "message" : "internal server error",
            "error" : e
        })
    }
}

exports.updateExercise = async (req, res) => {
    try{
        const {exerciseName} = req.body

        if(exerciseName){
            const updatedExercise = await exerciseModel.findOneAndUpdate({"exerciseName" : exerciseName}, req.body, function(err, doc){
                if(err){
                    res.status(500).json({
                        "message" : "Something went wrong",
                        "error" : err
                    })
                }
                else{
                    res.status(200).json(doc)
                }
            })
        }
        else{
            res.status(401).json({
                "message" : "Exercise name is required"
            })
        }
    }
    catch(e){
        res.status(500).json({
            "message" : "Internal server error",
            "error" : e
        })
    }
}