// lấy data và tiền xử lý rồi gửi tới service
const userService = require('./user.service');
const { Error } = require('../../commons/errorHandling');

const activateUser = async (req, res) => {
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
        throw err;
    }
};

const resendToken = async (req, res) => {
    try {
        res.status(200).json(await userService.resendToken(req.body.email));
    } catch (err) {
        res.status(400).json(err);
    }
};
const forgotPassword = async (req, res) => {
    const { email, activeCode , password } = req.body;
    try {
        res.status(200).json(await userService.forgotPassword(email, activeCode , password));
    } catch (err) {
        res.status(400).json(err);
    }
};

const changePassword = async (req,res) => {
    const {email, password, newPassword } = req.body;
    try {
        res.status(200).json(await userService.changePassword(email , password, newPassword));
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = { activateUser, resendToken, forgotPassword , changePassword };
