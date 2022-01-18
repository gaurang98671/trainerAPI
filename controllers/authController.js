const User = require("../models/auth")
const userProfileModel = require('../models/user_data_model')
const session = require('express-session')
require('dotenv').config()
const jwt  = require('jsonwebtoken')



exports.login = async (req, res)=>{
    try{
        const {userEmail, userPassword} = req.body
        if(userEmail && userPassword){
            const user = await User.find({'userEmail': userEmail, 'userPassword': userPassword}) //this returns list
            if(user.length!=0){
                console.log(user, user[0]._id)
                const reqUser = user[0]
                const userObject = {"userEmail" : userEmail, "userId" : reqUser._id}
                console.log(userObject)
                const accessToken = jwt.sign(userObject, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "60m"})
                const refreshToken = jwt.sign(userObject, process.env.REFRESH_TOKEN_SECRET)
                req.session.refreshToken = refreshToken
              
                res.status(200).json({
                "accessToken" :  accessToken,
                "refreshToken" : refreshToken 
                })
            }
        else{
                
                res.status(401).json({
                    "message" : "incorrect credentials"
                })
            }
        }
        else{
           
            res.status(400).json({
                "message" : "missing fields"
            })
        }
    }
    catch(e){
        
        res.status(500).json({
            "message" : "unknown error occured"
        })
    }

}

exports.signup = async (req, res)=>{
    try{
        const {userName, userEmail, userPassword, userPhone} = req.body
        if(userName && userEmail && userPassword && userPhone){
            //TODO
            //Check if phone number is valid
            //Check is email is valid
            //Check if user alredy exists
            //Hash password
            const re = /([0-9a-zA-Z])+@([a-z])+(([.])([a-z]+))+/
            const phnre = /[0-9]{10}/
            if(!re.test(userEmail)){
                res.status(422).json({
                    "message" : "email invalid"
                })
            }
            else if(!phnre.test(userPhone)){
                res.status(422).json({
                    "message" : "phone invalid"
                })
            }
            else{
                const user = await User.find({"userEmail": userEmail})
                if(user.length!==0){
                    console.log(user)
                    res.status(409).json({
                        "message": "user already exists"
                    })
                }
                else{
                   var userAuth = await User.create({
                        "userName" : userName,
                        "userPassword" : userPassword,
                        "userEmail" : userEmail,
                        "userPhone" : userPhone
                    })

                    //create profile
                    var userProfile = {
                        userEmail : userEmail,
                        userPhone : userPhone,
                        userName : userName,
                        userId : userAuth._id
                    }
                    
                    const userProfileDb = await userProfileModel.create(userProfile)
                    console.log(userProfileDb)

                    res.status(200).json({
                        "message" : "user created"
                    })
                }
            }
        }
        else{
            res.status(400).json({
                "message" : "missing fields"
            })
        }
    }
    catch(e){
        res.status(500).json({
            "message" : "unknown error occured"
        })
    }
}

exports.refreshToken = (req, res)=>{
    const token = req.body.token
    console.log(req.session.refreshToken)
    const refreshToken = req.session.refreshToken
    if(refreshToken){
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err,verifiedToken)=>{
            if(err){
                console.log("error occured")
                res.send(err.message)
            }
            else{
                const user = {"userEmail" : verifiedToken.userEmail, "userId" : verifiedToken.userId}
                console.log(verifiedToken)
                const newAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn : "60m"})
                console.log("new token", newAccessToken)
                res.status(200).json({
                    "accessToken" : newAccessToken
                })
            }
        })
    }
    else{
        console.log('unauthorized token')
        res.status(400).json({
            "message" : "unauthorized"
        })
    }
    
}