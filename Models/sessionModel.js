const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    'sessionToken': {
        type: String
    },
    'sessionEndedAt': {
        type: String
    },
    'userToken': {
        type: String
    },
    'userIP': {
        type: String
    },

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('sessionModel', sessionSchema);