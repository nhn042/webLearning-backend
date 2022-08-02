// lấy data và tiền xử lý rồi gửi tới service
const userService = require('./user.service');
const { Error } = require('../../commons/errorHandling');

const activateUser = async (req, res, next) => {
    const { email, otp } = req.body;
    try {
        if (await userService.activateUser(email, otp)) {
            res.status(200).json({
                email: email,
                otp: otp,
                message: 'Email is active',
            });
        } else {
            res.status(400).send('fail activate email');
        }
    } catch (err) {
        next(err);
    }
};

const resendToken = async (req, res, next) => {
    try {
        res.status(200).json(await userService.resendToken(req.body.email));
    } catch (err) {
        next(err);
    }
};
const forgotPassword = async (req, res, next) => {
    const { email, activeCode, password } = req.body;
    try {
        res.status(200).json(
            await userService.forgotPassword(email, activeCode, password)
        );
    } catch (err) {
        next(err);
    }
};

const changePassword = async (req, res, next) => {
    const { email, password, newPassword } = req.body;
    console.log(req.body);
    try {
        if (await userService.changePassword(email, password, newPassword)) {
            res.status(200).json('change pass success');
        } else {
            res.status(400).send('change pass fail');
        }
    } catch (err) {
        next(err);
    }
};

const updateUserInfo = async (req, res, next) => {
    const userUpdate = req.body;
    try {
        if (await userService.updateUserInfo(userUpdate)) {
            res.status(200).json('update success');
        } else {
            res.status(400).send('update fail');
        }
    } catch (err) {
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
