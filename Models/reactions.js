const mongoose = require('mongoose');

const reactionSchema = mongoose.Schema({
    'token': {
        type: String
    },
    'reaction': {
        type: String
    },
    'reactorToken': {
        type: String
    },
    'postToken': {
        type: String
    },
    'status': {
        type: String
    },
    'posterToken': {
        type: String
    },
});

module.exports = mongoose.model('reactionSchema', reactionSchema)