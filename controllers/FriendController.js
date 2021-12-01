const { makeToken, Auth } = require('../helpers/utls');
const FriendShp = require('../Models/friendShp');
const UserController = require('./UserController');
const User = require('../Models/user');


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
            let isFriend = await FriendShp.find({})

            if (proceed) {
                let newFriendRequst = new FriendShp({
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
                let allRequst = await FriendShp.find();
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
            const { user } = req.body
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
                let userFriendRequst = await FriendShp.find({ to: user });
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
    // acceptFriendRequst: async (req, res) => {

    //     try {
    //         const { usertoken, sessiontoken } = req.headers
    //         const { user } = req.params
    //         let proceed = true;
    //         if (await Auth(usertoken, sessiontoken) === false) {
    //             proceed = false;
    //             res.send({
    //                 type: "Error",
    //                 data: {
    //                     msg: "Mismatch"
    //                 }
    //             })
    //         }

    //         if (proceed) {
    //             let userFriendRequst = await FriendShp.find({ to: user });

    //             res.send({
    //                 type: "Your FrindRequst",
    //                 data: {
    //                     items: results

    //                 },
    //             })
    //         }


    //     } catch (error) {
    //         res.send({
    //             type: "Catch Error",
    //             data: error
    //         })
    //         console.log(error)

    //     }
    // }
}