const userDB = require('../users/user.repository');
const jwt = require('jsonwebtoken');
const userService = require('../users/user.service');
const utils = require("../../utils/function.utils")

const checkLogin = async (username, password) => {
    try {
        const user = await userDB.loginByName(username, utils.hashPassword(password)) ;
        if (user && user.isActive) {
            return jwt.sign(
                {user},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
        } else {
            throw new Error("500" , "user is exist")
        }
    } catch (err) {
        throw err;
    }
};

const register = async (username, password, email, fullname, dob) => {
    try {
        return await userService.createNewUser(
            username,
            password,
            email,
            fullname,
            dob
        );
    } catch (err) {
        throw err;
    }
};



module.exports = { checkLogin, register };
