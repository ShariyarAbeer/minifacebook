const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    'usertoken': {
        type: String
    },
    'username': {
        type: String
    },
    'password': {
        type: String
    },
    'fristName': {
        type: String
    },
    'lastName': {
        type: String
    },
    'birthDate': {
        type: String
    },

}, {
    timestamps: true,
})


module.exports = mongoose.model('User', userSchema);