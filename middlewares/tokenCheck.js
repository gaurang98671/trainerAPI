require('dotenv').config()
const jwt = require('jsonwebtoken')

const tokenCheck = (req, res, next)=>{
    console.log("in middleware")
    var authToken = req.headers.authorization
    
    if(authToken){
        var token = authToken.split(' ')[1]

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, verifiedToken)=>{
            if(err){
                res.send(err.message)
            }
            else{
                req.userId = verifiedToken.userId
                req.userEmail = verifiedToken.userEmail
                console.log(verifiedToken)
                console.log("inserted user id", verifiedToken.userId)
                next()
            }
        })
    }
    else{
        res.status(404).json({
            "message": "token not found"
        })
    }
}

module.exports = tokenCheck