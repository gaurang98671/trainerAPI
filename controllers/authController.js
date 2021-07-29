const User = require("../models/auth")

exports.login = async (req, res)=>{
    try{
        const {userName, userPassword} = req.body
        if(userName && userPassword){
            const user = await User.find({'userName': userName, 'userPassword': userPassword})
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

exports.signup = (req, res)=>{
    console.log(req.body)
    res.status(200).send("ge")
}

