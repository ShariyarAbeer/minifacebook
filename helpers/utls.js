const moment = require('moment');
const sessionModel = require('../Models/sessionModel');
// @return UNIX milliseconds requires moment js - Author: Istiaq Hasan
const unixMS = () => {
    return moment().format('x');
}

// @returns a random number by given length - Author: Istiaq Hasan
const numRand = (length) => {
    let result = [];
    let characters = '0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}

// @returns a random string by given length - Author: Istiaq Hasan
const stringRand = (length) => {
    let result = [];
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
}

// @makes a token to use for multiple synced databases for one system
const makeToken = (v) => {
    let token = stringRand(4) + numRand(2) + v.label + unixMS() + stringRand(2) + numRand(2);
    return token;
}
const Auth = async (userToken, sessionToken) => {
    try {
        let checkAuth = await sessionModel.find({ userToken: userToken, sessionToken: sessionToken, sessionEndedAt: 'hi' })


        if (checkAuth.length == 1) {
            return true;
        } else {
            return false;
        }

    } catch (error) {

        return false;

    }

}

module.exports = { unixMS, numRand, stringRand, makeToken, Auth }