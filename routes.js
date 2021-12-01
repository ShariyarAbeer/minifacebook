const express = require('express');
const FriendController = require('./controllers/FriendController.js');
const PostController = require('./controllers/PostController.js');
const router = express.Router();
const UserController = require('./controllers/UserController.js');


router.post('/account/create', UserController.createAccount);
router.post('/account/login', UserController.loginAccount);
router.post('/account/logout', UserController.logout);


router.post('/post/create', PostController.createPost);
router.post('/friend/requst', FriendController.sendRequst);
// router.post('/friend/accept', FriendController.acceptFriendRequst);


router.get('/all/requst', FriendController.allRequst);
router.get('/all/requst/forone', FriendController.allRequstForOne);





module.exports = router;