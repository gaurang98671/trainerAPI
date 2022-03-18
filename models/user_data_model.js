const mongoose = require('mongoose')

const userDataSchema = mongoose.Schema({

    userEmail : {
        type : String, 
        require: [true, "Email is required"],
        unique : true
    },

    userName : {
        type : String, 
        require : [true, "User name is required"]
    },

    userPhone : {
        type : String, 
        require : [false]
    },

    userId : {
        type : String,
        require : [true, "User id is required"],
        unique : true
    },

    userDOB : {
        type : String,
        require : [false]
    },

    userAge : {
        type : Number, 
        require : [false]
    },

    userHeight : {
        type: Number,
        require : [false],
    },

    userWeight : {
        type : Number,
        require : [false]
    },

    userIssues : {
        type : Array,
        required : [false]
    },

    userBMI : {
        type : Number,
        required : [false]
    },

    userBMR : {
        type : Number,
        required : [false]
    },

    userPurpose : {
        type : String, 
        required : [false]
    },

    userActivity : {
        type : String, 
        required : [false]
    },

    userGender : {
        type : String, 
        required : [false]
    }
})

const userData = mongoose.model("userData", userDataSchema)

module.exports = userData