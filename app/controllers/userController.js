const User = require("../models/userModel")

module.exports.register = (req, res) => {
    const user = new User(req.body)
    user.save()
        .then(user => res.json(user))
        .catch(err => res.json(err))
}