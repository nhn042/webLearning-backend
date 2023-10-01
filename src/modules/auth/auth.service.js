const userRepo = require('../users/user.repository');
const jwt = require('jsonwebtoken');
const userService = require('../users/user.service');
const utils = require('../../utils/function.utils');
const { Error } = require('../../commons/errorHandling');
const serect_key = 'WEBAPI'
const checkLogin = async (accountName, password) => {
    try {
        // console.log('utils.hashPassword(password)', utils.hashPassword(password));
        const user = await userRepo.login(accountName, password);
        console.log('user', user);
        if (!user) {
            return res.status(400).send({
                success: false,
                message: 'User not found',
            });
        } else {
            const token = jwt.sign(
                {
                    userId: user._id.toString(),
                    username: user.username,
                    email: user.email,
                },
                serect_key,
                {
                    expiresIn: '1d',
                }
            );
            return {
                success: true,
                token: token,
                message: 'User found',
            };
        }
    } catch (err) {
        throw err;
    }
};

const register = async (userRegister) => {
    try {
        return await userService.createNewUser(userRegister);
        // console.log(responses);
        // if (response.success === true) {
        //     return res.status(200).send({
        //         success: true,
        //         message: 'dang ky thanh cong',
        //     });
        // } else {
        //     return response.status(400).send({
        //         success: false,
        //         message: 'dang ky that bai',
        //     });
        // }
    } catch (err) {
        return {
            success: false,
            message: 'dang ky that bai',
        };
    }
};

module.exports = { checkLogin, register };
