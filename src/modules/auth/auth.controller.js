const authService = require('./auth.service');
const functitonUtils = require('../../utils/function.utils');

const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const response = await authService.checkLogin(username, password)
        if (response.success === true) {
            // console.log(accessToken);
            // res.status(200).send(accessToken);
            return res.status(200).send({
                token: response.token,
                success: true,
                message: 'dang nhap thanh cong',
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'dang nhap that bai',
            });
        }
    } catch (err) {
        return res.status(404).send({
            success: false,
            message: 'User not found',
        });
    }
};

const register = async (req, res, next) => {
    const userRegister = req.body;
    // userRegister.password = functitonUtils.hashPassword(userRegister.password);
    try {
        const response = await authService.register(userRegister);
        console.log('response', response);
        if(response.success === true) {
            return res.status(200).send({
                success: true,
                message: 'dang ky thanh cong',
            });
        } else {
            return res.status(404).send({
                success: false,
                message: 'dang ky that bai',
            });
        }
    } catch (err) {
        return res.status(err.errorCode).send({
            success: false,
            message: 'User not found',
        });
    }
};

module.exports = { login, register };
