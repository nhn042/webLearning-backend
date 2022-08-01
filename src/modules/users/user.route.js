const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.post('/activate', userController.activateUser);
router.post('/resendToken' , userController.resendToken);
router.post('/forgot-password' , userController.forgotPassword);
router.post('/change-password' , userController.changePassword);
module.exports = router;
