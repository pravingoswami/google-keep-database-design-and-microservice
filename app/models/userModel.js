const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

userSchema.pre('save', function(next){
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(10)
            .then(salt => {
                bcryptjs.hash(user.password, salt)
                    .then(ancryptedPassword => {
                        user.password = ancryptedPassword
                        next()
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    } else {
        next()
    }
})

userSchema.statics.findByCredential = function(username, password){
    const User = this
    return User.findOne({username})
                .then(User => {
                    if(!User){
                        return Promise.reject({error : 'Invalid Username'})
                    }
                    return bcryptjs.compare(password, User.password)
                        .then(result => result ? Promise.resolve(User) : Promise.reject({error : 'Invalid password'}))
                        .catch(err => Promise.reject(err))
                    
                })
                .catch(err => Promise.reject(err))
}

userSchema.methods.generateToken = function(ip){
    const user = this
    const tokenData = {
        id : user._id,
        username : user.username,
        createdAt : Date.now()
    }
    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({token})
    user.ips.login.push(ip)
    user.loginCount += 1
    return user.save()
                .then(user => Promise.resolve(token))
                .catch(err => Promise.reject(err))

}

userSchema.statics.findByToken = function(token){
    const User = this
    let tokenData
    try{
        tokenData = jwt.verify(token, 'jwt@123')
    } catch(err) {
        return Promise.reject(err)
    }
    return User.findOne({
        '_id' : tokenData.id,
        'tokens.token' : token
    })
}

const User = mongoose.model('User' , userSchema)

module.exports = User