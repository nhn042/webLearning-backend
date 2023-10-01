const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const middlewareUtils = require('../../utils/middleware.utils');
const auth = require('../../middleware/author');

router.post('/activate', auth, userController.activateUser);
router.post('/resendToken', auth, userController.resendToken);
router.patch('/forgot-password', auth, userController.forgotPassword);
router.patch('/change-password', auth, userController.changePassword);
router.patch('/update-userInfo', userController.updateUserInfo);
module.exports = router;
