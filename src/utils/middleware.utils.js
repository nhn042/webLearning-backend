const { Error } = require('../commons/errorHandling');
require('dotenv').config({ path: '../configs/.env' });
const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            next();
        } catch (err) {
            next(new Error("500" , "User is not login"));
        }
    } else {
        next(new Error("500" , "User is not login"));
    }
};

module.exports = {checkLogin};