const authService = require('./auth.service');
const functitonUtils = require('../../utils/function.utils');

const login = async (req, res, next) => {
    const { account, password } = req.body;
    try {
        const accessToken = await authService.checkLogin(account, password);
        console.log(accessToken);
        res.status(200).send(accessToken);
    } catch (err) {
        res.status(err.errorCode).json(err.errorMessage);
        next(err);
    }
};

const register = async (req, res, next) => {
    const userRegister = req.body;
    userRegister.password = functitonUtils.hashPassword(userRegister.password);
    try {
        if (await authService.register(userRegister)) {
            res.status(200).json({
                message: 'Used Saved',
                username: userRegister.username,
                password: userRegister.password,
            });
        } else {
            res.status(401).json({ message: 'Register Failed' });
        }
    } catch (err) {
        res.status(err.errorCode).json(err.errorMessage);
        next(err);
    }
};

module.exports = { login, register };
