const argon2 = require('argon2');
const { makeToken, Auth } = require('../helpers/utls');
const CommentModel = require('../Models/commentModel');
const PostModel = require('../Models/postModel');
const SessionModel = require('../Models/postModel');
const Reactions = require('../Models/reactions');
const ReplyCommentModel = require('../Models/replyCommentModel');

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
    reactPost: async (req, res) => {
        try {
            // token auto
            //reaction
            // reactorToken usertoken
            // postToken postToken jeta dibe
            // status postModel er postPrivacy
            // posterToken
            const { postToken, reaction, posterToken, status } = req.body
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
            let newPostToken = await Reactions.find({ postToken: postToken })
            if (newPostToken.length != 0) {
                proceed = false;
                let singleToken = await Reactions.findOneAndUpdate(
                    { 'token': newPostToken[0].token },
                    {
                        '$set': {
                            status: "inactive"
                        }
                    },
                    { new: true }
                );
                res.send({
                    type: "Post status inactive",
                    data: {
                        post: newPostToken,
                        msg: singleToken
                    }
                })
            }
            if (proceed) {
                let newReact = new Reactions({
                    token: makeToken({ label: 'postReactToken' }),
                    reaction: reaction,
                    reactorToken: usertoken,
                    postToken: postToken,
                    status: status,
                    posterToken: posterToken,

                });
                let newReactDone = await newReact.save();
                res.send({
                    type: "React Done",
                    data: {
                        postToken: newReact.postToken,
                        msg: newReactDone
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
    unReactPost: async (req, res) => {
        try {
            // token auto
            //reaction
            // reactorToken usertoken
            // postToken postToken jeta dibe
            // status postModel er postPrivacy
            // posterToken
            const { token, postToken } = req.body
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

            let newPostToken = await PostModel.find({ postToken: postToken })
            let singleToken = await Reactions.findOneAndUpdate(
                { 'token': token },
                {
                    '$set': {
                        status: "inactive"
                    }
                },
                { new: true }
            );
            if (proceed) {

                res.send({
                    type: "Post status inactive",
                    data: {
                        post: newPostToken,
                        msg: singleToken
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
    postComment: async (req, res) => {
        try {
            // token auto
            //postToken
            // commenterToken 
            // content 
            // posterToken
            // status
            const { postToken, posterToken, content, status } = req.body
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
                let newComment = new CommentModel({
                    token: makeToken({ label: 'CommentToken' }),
                    postToken: postToken,
                    commenterToken: usertoken,
                    content: content,
                    posterToken: posterToken,
                    status: status,

                });
                let newCommentDone = await newComment.save();
                res.send({
                    type: "Comment Done",
                    data: {
                        status: status,
                        msg: newCommentDone
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
    replyComment: async (req, res) => {
        try {
            // thisToken auto
            //content
            // commentToken
            // postToken
            // replyerToken
            // commenterToken
            // posterToken
            // status
            const { content, commentToken, postToken, commenterToken, posterToken, status } = req.body
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
                let newComment = new ReplyCommentModel({
                    thisToken: makeToken({ label: 'CommentToken' }),
                    commentToken: commentToken,
                    postToken: postToken,
                    content: content,
                    replyerToken: usertoken,
                    commenterToken: commenterToken,
                    posterToken: posterToken,
                    status: status,

                });
                let newCommentDone = await newComment.save();
                res.send({
                    type: "Reply Comment Done",
                    data: {
                        status: status,
                        msg: newCommentDone
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
