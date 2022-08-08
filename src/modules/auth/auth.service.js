const userRepo = require('../users/user.repository');
const jwt = require('jsonwebtoken');
const userService = require('../users/user.service');
const utils = require('../../utils/function.utils');
const { Error } = require('../../commons/errorHandling');

const checkLogin = async (accountName, password) => {
    try {
        const user = await userRepo.login(accountName, utils.hashPassword(password));
        if (user && user.isActive) {
            return jwt.sign(
                {
                    userId: user._id.toString(),
                    username: user.username,
                    email: user.email,
                    fullname: user.fullname,
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '1d',
                }
            );
        } else {
            throw new Error('500', 'login fail');
        }
    } catch (err) {
        throw err;
    }
};

const register = async (userRegister) => {
    try {
        return await userService.createNewUser(userRegister);
    } catch (error) {
        throw error;
    }
};

module.exports = { checkLogin, register };
