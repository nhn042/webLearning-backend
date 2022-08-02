const authService = require('./auth.service');
const functitonUtils = require("../../utils/function.utils")
const {Error} = require("../../commons/errorHandling")

const login = async (req, res) => {
    const { account , password } = req.body;
    try {
        const accessToken = await authService.checkLogin(account, password);
        res.status(200).json(accessToken);
    } catch (err) {
        res.status(err.errorCode).json(err.errorMessage);
    }
};

const register = async (req, res) => {
    const userRegister = req.body;
    userRegister.password = functitonUtils.hashPassword(userRegister.password);
    if (
        await authService.register(userRegister)
    ) {
        res.status(200).json({
            message: 'Used Saved',
            username: userRegister.username,
            password: userRegister.password,
        });
    } else {
        res.status(401).json({ message: 'Register Failed' });
    }
};

module.exports = { login, register };
