const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const middlewareUtils = require('../../utils/middleware.utils');
const {
    validateActivateUser,
    validateResendToken,
    validateForgotPassword,
    validateChangePassword,
    validateUpdateUser,
} = require('./user.validation');

router.post('/activate', validateActivateUser, userController.activateUser);
router.post('/resendToken', validateResendToken, userController.resendToken);
router.patch('/forgot-password', validateForgotPassword, userController.forgotPassword);
router.patch('/change-password', middlewareUtils.checkLogin, validateChangePassword, userController.changePassword);
router.patch('/update-userInfo', middlewareUtils.checkLogin, validateUpdateUser, userController.updateUserInfo);
module.exports = router;
