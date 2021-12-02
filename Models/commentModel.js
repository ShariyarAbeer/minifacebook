
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    'token': {
        type: String
    },
    'postToken': {
        type: String
    },
    'commenterToken': {
        type: String
    },
    'content': {
        type: String
    },
    'posterToken': {
        type: String
    },
    'status': {
        type: String
    },

});

module.exports = mongoose.model('commentSchema', commentSchema)
