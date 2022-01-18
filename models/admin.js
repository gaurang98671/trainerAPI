const mongoose = require('mongoose')

const admin = mongoose.Schema({
    adminName : {
        type : String,
        required : [true, "Admin name is required"]
    },

    adminId : {
        type : String,
        required : [true, "Admin id is required"],
        unique : true
    },

    adminEmail : {
        type : String,
        required : [false],
        unique : true
    },

    adminRoles : {
        type : Array,
        required : [false]
    }
})

const adminModel = mongoose.model("admin", admin)

module.exports = adminModel