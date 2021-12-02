
const mongoose = require('mongoose');

const replyCommentSchema = mongoose.Schema({
    'thisToken': {
        type: String
    },
    'content': {
        type: String
    },
    'commentToken': {
        type: String
    },
    'postToken': {
        type: String
    },
    'replyerToken': {
        type: String
    },
    'commenterToken': {
        type: String
    },
    'posterToken': {
        type: String
    },
    'status': {
        type: String
    },

});

module.exports = mongoose.model('replyCommentSchema', replyCommentSchema)
