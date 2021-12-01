const argon2 = require('argon2');
const { makeToken, Auth } = require('../helpers/utls');
const PostModel = require('../Models/postModel');
const SessionModel = require('../Models/postModel');

module.exports = {
    createPost: async function (req, res) {
        try {
            const { postContent, postPrivacy } = req.body
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
            if (proceed) {
                let newPost = new PostModel({
                    'postToken': makeToken({ label: 'postToken' }),
                    'postContent': postContent,
                    'postPrivacy': postPrivacy,
                    'userToken': usertoken,
                    'sessionToken': sessiontoken,

                })
                let newPostDone = await newPost.save();
                res.send({
                    type: "Done",
                    data: {
                        postToken: newPost.postToken,
                        msg: "Hoise"
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
}
