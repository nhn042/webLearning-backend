const userRepo = require('../users/user.repository');
const jwt = require('jsonwebtoken');
const userService = require('../users/user.service');
const utils = require('../../utils/function.utils');
const { Error } = require('../../commons/errorHandling');

const checkLogin = async (accountName, password) => {
    try {
        console.log(accountName);
        const user = await userRepo.login(
            accountName,
            utils.hashPassword(password)
        );
        console.log(user);
        if (user && user.isActive) {
            await user.save();
            return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d',
            });
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
    } catch (err) {
        throw err;
    }
};

module.exports = { checkLogin, register };
