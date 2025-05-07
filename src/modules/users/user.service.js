const userRepo = require('./user.repository');
const jwt = require('jsonwebtoken');
const functionUtils = require('../../utils/function.utils');
const { Error } = require('../../commons/errorHandling');
const User = require('./user.module');

const activateUser = async (email, otp) => {
    try {
        const user = await userRepo.findUserByEmail(email);
        if (user.isActive === true) {
            throw new Error(400, 'This user is active');
        }
        const otpCode = user.activeCode;
        if (otp === otpCode) {
            user.isActive = true;
            await user.save();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Can not activate user');
        }
    }
};

const resendToken = async (email) => {
    try {
        const user = await userRepo.findUserByEmail(email);
        user.activeCode = await functionUtils.sendOTPtoMail(email);
        await user.save();
    } catch (err) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Resend OTP fail');
        }
    }
};

const createNewUser = async (userRegister) => {
    try {
        const user = await userRepo.findUserByEmail(userRegister.email);
        if (user) {
            return {
                success: false,
                message: 'tài khoản đã tồn tại',
            };
        }
        const check = await userRepo.checkUserExists(userRegister.name, userRegister.email);
        if (check) {
            const user = await userRepo.createNewUser(userRegister);
            return {
                success: true,
                message: 'đăng ký thành công',
            };
        } else {
            return {
                success: false,
                message: 'email không hợp lệ',
            };
        }
    } catch (error) {
        console.log('error', error);
        return {
            success: false,
            message: 'đăng ký thất bại',
        };
    }
};

const forgotPassword = async (email, activeCode, password) => {
    try {
        const user = await userRepo.findUserByEmail(email);
        if (user.activeCode === activeCode) {
            user.password = functionUtils.hashPassword(password);
            await user.save();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Internal server error');
        }
    }
};

const changePassword = async (email, password, newPassword) => {
    try {
        const user = await userRepo.findUserByEmail(email);
        if (user.password === functionUtils.hashPassword(password)) {
            user.password = functionUtils.hashPassword(newPassword);
            await user.save();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Internal server error');
        }
    }
};

const updateUserInfo = async (userUpdate) => {
    try {
        console.log('userUpdate', userUpdate);
        const user = await userRepo.findUserByEmail(userUpdate.email);
        user.dob = userUpdate.dob ? userUpdate.dob : user.dob;
        user.number = userUpdate.number ? userUpdate.number : user.number;
        user.address = userUpdate.address ? userUpdate.address : user.address;
        user.gender = userUpdate.gender ? userUpdate.gender : user.gender;
        user.fullname = userUpdate.fullname ? userUpdate.fullname : user.fullname;
        await user.save();
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'update user fail');
        }
    }
};

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id,
            });
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined',
                });
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: user,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getDetailsUser,
    activateUser,
    createNewUser,
    resendToken,
    forgotPassword,
    changePassword,
    updateUserInfo,
};
