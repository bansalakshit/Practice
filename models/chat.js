const mongoose = require('mongoose')
const Schema = mongoose.Schema
const chatSchema = new Schema({
    msg: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('chat' , chatSchema);