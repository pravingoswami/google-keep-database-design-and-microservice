const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({

    username : {
        type : String,
        required : true,
        unique : true
    },

    name : {
        type : String
    },

    email : {
        type : String
    },

    mobile : {
        type : String
    },

    avatar : {
        type : String
    },

    password : {
        type : String
    },

    ips : {
        register : [String],
        login : [String],
        logout : [String]
    },

    tokens : [
        {
            token : {
                type : String
            },
            createdAt : {
                type : Date,
                default : Date.now()
            }
        }
    ],

    loginCount : {
        type : Number,
        default : 0
    },

    createdAt : {
        type : Date,
        default : Date.now()
    },

}) 

const User = mongoose.model('User' , userSchema)

module.exports = User