const userRepo = require('../users/user.repository');
const jwt = require('jsonwebtoken');
const userService = require('../users/user.service');
const utils = require('../../utils/function.utils');
const { Error } = require('../../commons/errorHandling');

const checkLogin = async (accountName, password) => {
    try {
        const user = await userRepo.login(accountName, utils.hashPassword(password));
        if (!user) {
            throw new Error(400, 'Can not find this user');
        }
        if (user.isActive) {
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
            throw new Error(400, 'this user is not active');
        }
    } catch (err) {
        if (err instanceof Error) throw err;
        throw new Error(500, 'Internal server error');
    }
};

const register = async (userRegister) => {
    try {
        await userService.createNewUser(userRegister);
    } catch (err) {
        throw err;
    }
};

module.exports = { checkLogin, register };
