const mongoose = require('mongoose');


const FriendShipSchema = mongoose.Schema({
    'fromPerson': {
        type: String
    },
    'toFriend': {
        type: String
    },
    'type': {
        type: String
    },

})

module.exports = mongoose.model('FrindShip', FriendShipSchema);