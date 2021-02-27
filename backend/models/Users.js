const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

// models 
const Users = mongoose.model('users', userSchema)

module.exports = {
    Users
}