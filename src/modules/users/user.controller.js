// lấy data và tiền xử lý rồi gửi tới service
const userService = require('./user.service');
const { Error } = require('../../commons/errorHandling');

const activateUser = async (req, res, next) => {
    const { email, otp } = req.body;
    try {
        const checkActivate = await userService.activateUser(email, otp);
        if (checkActivate) {
            res.status(200).json({
                email: email,
                otp: otp,
                message: 'Email is active',
            });
        } else {
            res.status(400).send('Wrong OTP');
        }
    } catch (err) {
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};

const resendToken = async (req, res, next) => {
    try {
        await userService.resendToken(req.body.email);
        res.status(200).send('Resend OTP success');
    } catch (err) {
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};
const forgotPassword = async (req, res, next) => {
    const { email, activeCode, password } = req.body;
    try {
        const checkForgotPass = await userService.forgotPassword(email, activeCode, password);
        if (checkForgotPass) {
            res.status(200).send('change forgot-password success');
        } else {
            res.status(400).send('Wrong OTP');
        }
    } catch (err) {
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};

const changePassword = async (req, res, next) => {
    const { email, password, newPassword } = req.body;
    try {
        const checkChangePass = await userService.changePassword(email, password, newPassword);
        if (checkChangePass) {
            res.status(200).send('change pass success');
        } else {
            res.status(400).send('Your password is wrong');
        }
    } catch (err) {
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};

const updateUserInfo = async (req, res, next) => {
    const userUpdate = req.body;
    try {
        await userService.updateUserInfo(userUpdate);
        res.status(200).send('update success');
    } catch (err) {
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};

module.exports = {
    activateUser,
    resendToken,
    forgotPassword,
    changePassword,
    updateUserInfo,
};
