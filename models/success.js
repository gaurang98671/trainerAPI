const mongoose = require('mongoose')

const userSuccess = mongoose.Schema(
    {
        userId : {
            type : String, 
            require : [true, "User id is required"]
        },

        exerciseId : {
            type : String,
            require : [true, "Exercise id is required"]
        },

        totalReps : {
            type : Number,
            required : [true, "Total reps is required"]
        },

        repsDone : {
            type : Number,
            required : [true, "Reps done are required"],
            default : 0
        },

        startedOn : {
            type : Date, 
            required : [true, "Date is required"]
        }
    }
)

const userSuccessModel = mongoose.model("userSuccess", userSuccess)
module.exports = userSuccessModel