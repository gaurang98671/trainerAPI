const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userEmail : 
    {
        type : String,
        require : [true, "Email is required"],
        unique : true
    },
    
    userName : 
    {
        type : String,
        require : [true, "Name is required"]
    },

    userPhone :
    {
        type : String,
    },

    userPassword :
    {
        type : String,
        require : [true, "Password is required"],
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User