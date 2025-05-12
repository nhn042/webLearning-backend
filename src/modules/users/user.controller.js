// lấy data và tiền xử lý rồi gửi tới service
const userService = require('./user.service');
const userRepo = require('./user.repository');
const { Error } = require('../../commons/errorHandling');
const sendMail = require('../../utils/sendMail');
const User = require('./user.module');

const getAllUser = async (req, res) => {
    try {
        const dataUser = await userRepo.findAllUser();
        if (dataUser) {
            res.status(200).json({
                data: dataUser,
                message: 'get all user success',
            });
        } else {
            res.status(400).send('Wrong OTP');
        }
    } catch (err) {
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};

const activateUser = async (req, res) => {
    res.status(200).json('Wrong OTP');
    // const { email, otp } = req.body;
    // try {
    //     const checkActivate = await userService.activateUser(email, otp);
    //     if (checkActivate) {
    //         res.status(200).json({
    //             email: email,
    //             otp: otp,
    //             message: 'Email is active',
    //         });
    //     } else {
    //         res.status(400).send('Wrong OTP');
    //     }
    // } catch (err) {
    //     res.status(err.errorCode).send(err.errorMessage);
    //     next(err);
    // }
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
const forgotPassword = async (req, res) => {
    const { query: email } = req.query;
    if (!email) {
        return res.status(404).json({
            message: 'Missing email',
        });
    }
    const user = await userRepo.findUserByEmail(email);

    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }
    const activeCode = Math.floor(Math.random() * 900000) + 100000;
    user.activeCode = activeCode;
    await user.save();
    const html = `Mã code của bạn để thay đổi mật khẩu là: ${activeCode}`;
    try {
        const data = {
            email,
            html,
        };
        const rs = await sendMail(data);

        return res.status(200).json({
            success: true,
            data: rs,
        });
    } catch (err) {
        return res.status(404).json({
            message: err,
        });
    }
};

const changePassword = async (req, res) => {
    const { id, email, code, password } = req.body;
    try {
        if (email) {
            const user = await userRepo.findUserByEmail(email);
            if (!user) throw new Error('User not found');
            if (user.activeCode === code && password) {
                user.password = password;
                await user.save();
                return res.status(200).json({
                    success: true,
                });
            } else {
                return res.status(400).json({
                    success: false,
                });
            }
        } else {
            const user = await userRepo.findUserById(id);
            if (user && password) {
                user.password = password;
                await user.save();
                return res.status(200).json({
                    success: true,
                });
            } else {
                return res.status(400).json({
                    success: false,
                });
            }
        }
    } catch (err) {
        return res.status(404).json({
            message: e,
        });
    }
};

const updateUserInfo = async (req, res, next) => {
    const userUpdate = req.body;
    const user = await userRepo.findUserByEmail(userUpdate.email);
    if (!user) {
        return res.status(404).send({
            success: false,
            message: 'dang ky that bai',
        });
    }
    try {
        await userService.updateUserInfo(userUpdate);
        res.status(200).send('update success');
    } catch (err) {
        res.status(err.errorCode).send(err.errorMessage);
        next(err);
    }
};

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required',
            });
        }
        const response = await userService.getDetailsUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

module.exports = {
    getDetailsUser,
    getAllUser,
    activateUser,
    resendToken,
    forgotPassword,
    changePassword,
    updateUserInfo,
};
