const { makeToken, Auth } = require('../helpers/utls');
const FriendShipT = require('../Models/friendshipTransactionModel');
const UserController = require('./UserController');
const FriendShip = require('../Models/friendship');
const User = require('../Models/user');
const moment = require('moment');



module.exports = {
    sendRequst: async (req, res) => {
        try {
            const { from, to, } = req.body
            const { usertoken, sessiontoken } = req.headers
            let proceed = true;
            if (await Auth(usertoken, sessiontoken) === false) {
                proceed = false;
                res.send({
                    type: "Error",
                    data: {
                        msg: "Mismatch"
                    }
                })
            }
            let isFriend = await FriendShip.find({ fromPerson: from, })
            // console.log(isFriend);
            if (isFriend.length != 0) {
                if (isFriend[0].type === "Friend") {
                    proceed = false;
                    res.send({
                        type: "Already Friend",
                        data: {
                            msg: "You guys are already friend"
                        }
                    })
                }

            }

            if (proceed) {
                let newFriendRequst = new FriendShipT({
                    'token': makeToken({ label: 'friendToken' }),
                    'from': from,
                    'to': to,
                    'type': 'FriendShip Requst',
                    'actionTime': 'hi',

                });
                let newFrindRequstDone = await newFriendRequst.save();
                // console.log(newFrindRequstDone);
                res.send({
                    type: "Frind Requst",
                    data: {
                        postToken: newFriendRequst.token,
                        from: from,
                        to: to,
                        msg: 'Friend Requst Send'
                    }
                })
            }

        } catch (error) {
            res.send({
                type: "Catch Error",
                data: error
            })
            console.log(error)

        }
    },
    allRequst: async (req, res) => {
        const { usertoken, sessiontoken } = req.headers
        try {
            let proceed = true;
            if (await Auth(usertoken, sessiontoken) === false) {
                proceed = false;
                res.send({
                    type: "Error",
                    data: {
                        msg: "Mismatch"
                    }
                })
            }
            if (proceed) {
                let allRequst = await FriendShipT.find();
                let results = [];

                for (let i = 0; i < allRequst.length; i++) {
                    let thisItem = allRequst[i];
                    let fromUser = await User.find({ userToken: thisItem.from });
                    let toUser = await User.find({ userToken: thisItem.to });
                    let newItem = {
                        token: thisItem.token,
                        from: thisItem.from,
                        fromFirstName: fromUser[0].fristName,
                        fromLastName: fromUser[0].lastName,
                        to: thisItem.to,
                        toFirstName: toUser[0].fristName,
                        toLastName: toUser[0].lastName,
                        type: thisItem.type,
                        actionTime: thisItem.actionTime
                    }
                    results.push(newItem);
                }
                res.send({
                    type: "All Requst",
                    data: {
                        items: allRequst

                    },
                })
            }


        } catch (error) {
            res.send({
                type: "Catch Error",
                data: error
            })
            console.log(error)

        }
    },
    allRequstForOne: async (req, res) => {

        try {
            const { usertoken, sessiontoken } = req.headers
            const { user } = req.params
            let proceed = true;
            if (await Auth(usertoken, sessiontoken) === false) {
                proceed = false;
                res.send({
                    type: "Error",
                    data: {
                        msg: "Mismatch"
                    }
                })
            }

            if (proceed) {
                let userFriendRequst = await FriendShipT.find({ to: user });
                let results = [];

                for (let i = 0; i < userFriendRequst.length; i++) {
                    let thisItem = userFriendRequst[i];
                    let fromUser = await User.find({ userToken: thisItem.from });
                    let toUser = await User.find({ userToken: thisItem.to });
                    let newItem = {
                        token: thisItem.token,
                        from: thisItem.from,
                        fromFirstName: fromUser[0].fristName,
                        fromLastName: fromUser[0].lastName,
                        to: thisItem.to,
                        toFirstName: toUser[0].fristName,
                        toLastName: toUser[0].lastName,
                        type: thisItem.type,
                        actionTime: thisItem.actionTime
                    }
                    results.push(newItem);
                }
                res.send({
                    type: "Your FrindRequst",
                    data: {
                        items: results

                    },
                })
            }


        } catch (error) {
            res.send({
                type: "Catch Error",
                data: error
            })
            console.log(error)

        }
    },
    acceptFriendRequst: async (req, res) => {

        try {
            const { usertoken, sessiontoken } = req.headers
            const { from, to, } = req.body
            let proceed = true;
            if (await Auth(usertoken, sessiontoken) === false) {
                proceed = false;
                res.send({
                    type: "Error",
                    data: {
                        msg: "Mismatch"
                    }
                })
            }
            let isFriend = await FriendShip.find({ fromPerson: from, })
            console.log(isFriend);
            if (isFriend.length != 0) {
                if (isFriend[0].type === "Friend") {
                    proceed = false;
                    res.send({
                        type: "Already Friend",
                        data: {
                            msg: "You guys are already friend"
                        }
                    })
                }

            }

            if (proceed) {
                let friendShip = new FriendShip({
                    'fromPerson': from,
                    'toFriend': to,
                    'type': 'Friend'

                })
                let friendShipTUpdate = await FriendShipT.findOneAndUpdate({ from: from }, { $set: { actionTime: moment.utc().format('YYYY-MM-DD HH:mm:ss') } }, { new: true });
                let frindShipDone = await friendShip.save();
                res.send({
                    type: "FrindRequst accepted",
                    data: {
                        items: frindShipDone

                    },
                })
            }


        } catch (error) {
            res.send({
                type: "Catch Error",
                data: error
            })
            console.log(error)

        }
    }
}