const mongoose = require('mongoose')

const exercise = mongoose.Schema({
    exerciseName : {
        type : String,
        require : [true, "Exercise name is required"],
        unique : true
    },

    exerciseDescription : {
        type : String, 
        required : [false]
    },

    muscleGroups : {
        type : Array,
        required : [true, "Exercise target muscle groups are reauired"]
    },

    exerciseIssues : {
        type : Array,
        required : [false]
    },

    exerciseModelPath : {
        type : String,
        required: [true, "Exercise model path is required"]
    },

    exerciseDifficulty : {
        type : Number,
        required : [true, "Exercise difficulty is required"],
        min : [1, "Difficulty must be in range 1-10"],
        max : [10, "Difficulty must be in range 1-10"]
    }

})

const exerciseModel = mongoose.model("exercise", exercise)

module.exports = exerciseModel