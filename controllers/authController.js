const User = require("../models/auth")

exports.login = async (req, res)=>{
    try{
        const {userEmail, userPassword} = req.body
        if(userEmail && userPassword){
            const user = await User.find({'userEmail': userEmail, 'userPassword': userPassword})
            if(user.length!=0){
                res.status(200).json({
                    "message": "login success"
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
                    User.create({
                        "userName" : userName,
                        "userPassword" : userPassword,
                        "userEmail" : userEmail,
                        "userPhone" : userPhone
                    })
        
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

