const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../../configs/.env' });
const userRepo = require('./user.repository');
const authService = require("../auth/auth.service")
const utils = require('../../utils/function.utils');

const activateUser = async (email, otp) => {
    const user = await userRepo.findUserByEmail(email);
    const otpCode = user.activeCode;
    if (otp === otpCode) {
        user.isActive = true;
        await user.save();
        console.log(user);
        return true;
    } else {
        return false;
    }
};

const resendToken = async (email) => {
    try {
        const user = await userRepo.findUserByEmail(email);
        user.activeCode = await utils.sendOTPtoMail(email);
        await user.save();
        return user.activeCode;
    } catch (err) {
        throw err;
    }
};

const createNewUser = async (username, password, email, fullname, dob) => {
    if (!(await userRepo.checkUserExists(username, password, email))) {
        const newUser = await userRepo.createNewUser(
            username,
            password,
            email,
            fullname,
            dob
        );
        if (newUser) {
            console.log('create success');
            const user = await userRepo.findUserByEmail(email);
            user.activeCode = await utils.sendOTPtoMail(email);
            await user.save();
            return true;
        } else {
            return false;
        }
    } else {
        throw new Error('500', 'user exists');
    }
};

const forgotPassword = async (email, activeCode, password) => {
    const user = await userRepo.findUserByEmail(email);
    if (user.activeCode === activeCode) {
        user.password = utils.hashPassword(password);
        await user.save();
        return "change forgot-password success";
    } else {
        throw new Error('500', ' activeCode is wrong ');
    }
};

const changePassword = async (email, password, newPassword) => {
    if(await authService.checkLogin(email, password)){
        
    }
    const user = await userRepo.findUserByEmail(email);
    if (user.activeCode === activeCode) {
        user.password = utils.hashPassword(password);
        await user.save();
        return "change forgot-password success";
    } else {
        throw new Error('500', ' activeCode is wrong ');
    }
};

module.exports = { activateUser, createNewUser, resendToken, forgotPassword , changePassword };
