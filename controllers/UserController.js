const UserModel = require('../Models/user');
const SessionModel = require('../Models/sessionModel');
const argon2 = require('argon2');
const makeToken = require('../helpers/utls');
const moment = require('moment');


module.exports = {
    createAccount: async (req, res) => {
        try {
            let usertoken = makeToken.makeToken({ label: 'abeerToken' })
            const { username, password, fristName, lastName, birthdate } = req.body;
            let proceed = true;
            const hashedPassword = await argon2.hash(password);
            //user name check// user name ache na ki check
            let userCheck = await UserModel.find({ username: username });
            if (userCheck.length != 0) {
                proceed = false;
                res.send({
                    type: "Error",
                    data: {
                        msg: "User already in database"
                    }
                })

            }
            if (proceed) {

                let newUser = new UserModel({
                    "usertoken": usertoken,
                    "username": username,
                    "password": hashedPassword,
                    "fristName": fristName,
                    "lastName": lastName,
                    "birthdate": birthdate,
                });
                let newUserSave = await newUser.save();
                if (newUserSave) {
                    res.send({
                        type: "Done",
                        data: {
                            msg: "User added"
                        }
                    })
                } else {
                    res.send({
                        type: "Error",
                        data: {
                            msg: "Please try again"
                        }
                    })
                }
            }
        } catch (error) {
            // console.log(error);
            res.send({
                type: "Catch Error",
                data: error
            })
        }
    },
    loginAccount: async (req, res) => {
        try {
            let proceed = false;
            const { username, password } = req.body;
            let checkUser = await UserModel.find({ username: username })
            if (checkUser.length == 1) {
                let checkPassword = await argon2.verify(checkUser[0].password, password);
                if (checkPassword) {
                    proceed = true;


                } else {
                    res.send({
                        type: "Error",
                        data: {
                            msg: "Password Error"
                        }
                    })
                }
            } else {
                res.send({
                    type: "Error",
                    data: {
                        msg: "Please try again to reg."
                    }
                })
            }
            if (proceed) {
                let sessionToken = new SessionModel({
                    'sessionToken': makeToken.makeToken({ label: 'sessionToken' }),
                    'sessionEndedAt': 'hi',
                    'userToken': checkUser[0].usertoken,
                    'userIP': req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress

                })
                await sessionToken.save();
                res.send({
                    type: "Done",
                    data: {
                        msg: 'Login',
                        session: sessionToken,
                    }
                })
            }

        } catch (error) {
            res.send({
                type: "Catch Error",
                data: error
            })

        }
    },
    logout: async (req, res) => {
        try {
            const { usertoken, sessiontoken } = req.headers
            let proceed = true;

            if (await makeToken.Auth(usertoken, sessiontoken) === false) {
                proceed = false;
                res.send({
                    type: "login Error",
                    data: "Sala Age login ho"
                })
            }
            if (proceed) {
                let userlogout = await UserModel.find({ sessionToken: sessiontoken });
                let updateSlider = await SessionModel.findOneAndUpdate(
                    { 'sessionToken': sessiontoken },
                    {
                        '$set': {
                            sessionEndedAt: moment.utc().format('YYYY-MM-DD HH:mm:ss')
                        }
                    },
                    { new: true }
                );
                console.log(userlogout);
                res.send({
                    type: "logout",
                    data: "logout hoise"
                })
            }

        } catch (error) {
            res.send({
                type: "Catch Error",
                data: error
            })

            console.log(error);
        }

    }

}