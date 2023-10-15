// lấy data và tiền xử lý rồi gửi tới service
const userService = require('./user.service');
const userRepo = require('./user.repository');
const { Error } = require('../../commons/errorHandling');

const getAllUser = async (req, res) => {
    try {
        const dataUser = await userRepo.findAllUser();
        console.log('dataUser', dataUser);
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

const changePassword = async (req, res) => {
    const { id, password } = req.body;
    try {
        const user = await userRepo.findUserById(id);
        if (password) {
            user.password = password;
            await user.save();
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
    console.log('userUpdate', userUpdate);
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
        console.log('req.params', req.params);
        const userId = req.params.id
        console.log('userId', userId);
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await userService.getDetailsUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    getDetailsUser,
    getAllUser,
    activateUser,
    resendToken,
    forgotPassword,
    changePassword,
    updateUserInfo,
};
