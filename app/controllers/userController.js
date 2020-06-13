const User = require("../models/userModel")

module.exports.register = (req, res) => {
    const user = new User(req.body)
    user.save()
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

module.exports.login = (req, res) => {
    let user
    User.findByCredential(req.body.username, req.body.password)
        .then(userData => {
            user = userData
            return userData.generateToken(req.ip)
                        .then(token => res.json({user, token}))
                        .catch(err => res.json(err))
        })
        .catch(err => res.json(err))
}

module.exports.userInfo = (req, res) => {
    res.json(req.user)
}

module.exports.editUser = (req, res) => {
    User.findByIdAndUpdate(req.user._id, req.body, {new : true, runValidators : true})
        .then(user => user ? res.json(user) : res.json({}))
        .catch(err => res.json(err))
}

module.exports.logout = (req, res) => {
    User.findByIdAndUpdate(req.user._id, {$pull : {tokens : {token : req.token}}})
        .then(user => user ? res.json(user) : res.json({}))
        .catch(err => res.json(err))        
}