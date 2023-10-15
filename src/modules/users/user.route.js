const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const middlewareUtils = require('../../utils/middleware.utils');
const auth = require('../../middleware/author');    

router.get('/getAll', userController.getAllUser);
router.post('/activate', userController.activateUser);
router.post('/resendToken', userController.resendToken);
router.patch('/forgot-password', userController.forgotPassword);
router.patch('/change-password', userController.changePassword);
router.get('/get-details/:id', userController.getDetailsUser)
router.patch('/update-userInfo', userController.updateUserInfo);
module.exports = router;
