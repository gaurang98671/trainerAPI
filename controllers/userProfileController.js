const userProfileModel = require('../models/user_data_model')
const session = require('express-session')
//TODO: add middleware to check whether user is valid

exports.getUserProfile = async (req, res) => {
    try{
        const userId = req.userId
        
        if(userId){
            const user = await userProfileModel.find({'userId' : userId})

            if(user){
                res.status(200).json(user)
            }
            else{
                res.status(400).json({
                    "message": "user not found"
                })
            }

        }
        else{
                res.status(401).json({
                    "message" : "invalid user ID"
                })
        }
    }
    catch(e){
                res.status(500).json({
                    "message" : "internal server error",
                    "error" : e
                })
    }
}

exports.postUserProfile = async (req, res) => {
    const userId = req.userId
    const {userName, userEmail, userDOB, userHeight, userWeight, userAge, userGender} = req.body

    if(!userEmail || !userId || !userName){
        res.status(400).json({
            "message" : "userid or email or userName  is missing"
        })
    }
    
    try{
        console.log("in try")
        var fitnessStatus = null
        var bmi = null
        var bmr = null

        //calculating bmi
        if(userWeight && userHeight){
            console.log("calculating bmi")
            
            bmi = Math.round(userWeight / (userHeight ** 2))
            console.log(bmi)
            if(bmi < 18.5){
                fitnessStatus  = "underweight"
            }
            else if(bmi >= 18.5 && bmi < 24.9){
                fitnessStatus = "healthy"
            }
            else if(bmi >= 24.9 && bmi < 30){
                fitnessStatus = "overweight"
            }
            else if(bmi > 30){
                fitnessStatus = "obese"
            } 
        }

        //calculating bmr
        if(userGender && userAge && userHeight && userWeight){
            console.log("calculating bmr")
            if(userGender === "male"){
                bmr = 88.362 + (13.397 * userWeight) + (4.799 * userHeight * 100) - (5.677 * userAge)
            }
            else if(userGender === 'female'){
                bmr = 447.593 + (9.247 * userWeight) + (3.098 * userHeight * 100) - (4.330 * userAge)
            }
        }

        console.log("creating user obj")
        var userProfile = {...req.body, userBMI : bmi, userBMR : bmr, userFitnessStatus : fitnessStatus}
        var updated = await userProfileModel.findOneAndUpdate({userEmail : userEmail}, userProfile)
        console.log('updated')
        console.log(updated)
        res.status(200).json(userProfile)

      
    }
    catch(e){
        res.status(500).json({
            "message" : "internal server error",
            "error" : e
        })
    }

}