const mongoose = require('mongoose')


const setupDB = () => {
    mongoose.connect('mongodb+srv://pravingoswami:Mongodb@cluster0-tg7gb.mongodb.net/google-keep-note-microservice?retryWrites=true&w=majority', {useNewUrlParser : true, useUnifiedTopology : true})
        .then(() => console.log('connected with database'))
        .catch((err) => console.log(err))
}

module.exports = setupDB