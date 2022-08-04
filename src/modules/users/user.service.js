const userRepo = require('./user.repository');
const functionUtils = require('../../utils/function.utils');
const { Error } = require('../../commons/errorHandling');

const activateUser = async (email, otp) => {
    try {
        const user = await userRepo.findUserByEmail(email);
        console.log(user);
        const otpCode = user.activeCode;
        console.log(otpCode);
        if (otp === otpCode) {
            user.isActive = true;
            await user.save();
            console.log(user);
            return true;
        } else {
            throw new Error('400', 'activate user fail');
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
        return user.activeCode;
    } catch (err) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'resend token fail');
        }
    }
};

const createNewUser = async (userRegister) => {
    try {
        if (!(await userRepo.checkUserExists(userRegister.username, userRegister.password, userRegister.email))) {
            const newUser = await userRepo.createNewUser(userRegister);
            const user = await userRepo.findUserByEmail(userRegister.email);
            user.activeCode = await functionUtils.sendOTPtoMail(userRegister.email);
            await user.save();
            return true;
        } else {
            throw new Error('500', 'user exists');
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'Create new user fail');
        }
    }
};

const forgotPassword = async (email, activeCode, password) => {
    try {
        const user = await userRepo.findUserByEmail(email);
        if (user.activeCode === activeCode) {
            user.password = functionUtils.hashPassword(password);
            await user.save();
            return 'change forgot-password success';
        } else {
            throw new Error('400', ' activeCode is wrong ');
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'change forgot-password fail');
        }
    }
};

const changePassword = async (email, password, newPassword) => {
    try {
        const user = await userRepo.findUserByEmail(email);
        console.log(user);
        if (user.password === functionUtils.hashPassword(password)) {
            user.password = functionUtils.hashPassword(newPassword);
            return await user.save();
        } else {
            throw new Error('400', 'wrong password');
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error(500, 'change password fail');
        }
    }
};

const updateUserInfo = async (userUpdate) => {
    try {
        const user = await userRepo.findUserByEmail(userUpdate.email);
        if (user) {
            user.dob = userUpdate.dob ? userUpdate.dob : user.dob;
            user.fullname = userUpdate.fullname ? userUpdate.fullname : user.fullname;
            console.log(user);
            await user.save();
            console.log(user);
            return user;
        } else {
            throw new Error('400', 'update is not success');
        }
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
