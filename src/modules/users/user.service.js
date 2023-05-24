const userRepo = require('./user.repository');
const functionUtils = require('../../utils/function.utils');
const { Error } = require('../../commons/errorHandling');

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
        // const check = await userRepo.checkUserExists(userRegister.username, userRegister.email);
        // if (!check) {
            console.log('user');
        const user = await userRepo.createNewUser(userRegister);
        console.log('user', user);
        // user.activeCode = await functionUtils.sendOTPtoMail(user.email);
        await user.save();
        // } else {
        //     throw new Error(400, 'user exists');
        // }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Internal server error');
        }
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
        const user = await userRepo.findUserByEmail(userUpdate.email);
        user.dob = userUpdate.dob ? userUpdate.dob : user.dob;
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

module.exports = {
    activateUser,
    createNewUser,
    resendToken,
    forgotPassword,
    changePassword,
    updateUserInfo,
};
