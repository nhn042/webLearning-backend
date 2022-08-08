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

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 * paths:
 *    /activate:
 *     post:
 *        summary: Activate Email
 *        tags: [User]
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                   schema:
 *                     type: object
 *                     properties:
 *                       email :
 *                            type: string
 *                       otp:
 *                            type: number
 *                     required:
 *                       - account
 *                       - otp
 *        responses:
 *            200:
 *                description: Email is activate
 *            500:
 *                description: Can not activate email
 *
 *    /resendToken:
 *     post:
 *        summary: Resend OTP to change password if you forgot your password
 *        tags: [User]
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                   schema:
 *                     type: object
 *                     properties:
 *                       email :
 *                            type: string
 *                     required:
 *                       - email
 *        responses:
 *            200:
 *                description: Resend token success
 *            500:
 *                description: Resend token fail
 *
 *    /forgot-password:
 *      patch:
 *        summary: forgot password
 *        tags: [User]
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                   schema:
 *                     type: object
 *                     properties:
 *                       email :
 *                            type: string
 *                       activeCode :
 *                            type: number
 *                       password :
 *                            type: string
 *                     required:
 *                       - email
 *                       - activeCode
 *                       - password
 *        responses:
 *            200:
 *                description: Change password success
 *            500:
 *                description: Change password fail
 *    /change-password:
 *      patch:
 *        summary: change password
 *        security:
 *           - bearerAuth: []
 *        tags: [User]
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                   schema:
 *                     type: object
 *                     properties:
 *                       password :
 *                            type: string
 *                       newPassword :
 *                            type: string
 *                     required:
 *                       - password
 *                       - newPassword
 *        responses:
 *            200:
 *                description: change password success
 *            500:
 *                description: change password fail
 *    /update-userInfo:
 *      patch:
 *        summary: Update User
 *        security:
 *            - bearerAuth: []
 *        tags: [User]
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                   schema:
 *                     type: object
 *                     properties:
 *                       dob :
 *                            type: string
 *                       fullname :
 *                            type: string
 *        responses:
 *            200:
 *                description: Update user success
 *            500:
 *                description: Update user fail
 */

router.post('/activate', validateActivateUser, userController.activateUser);
router.post('/resendToken', userController.resendToken);
router.patch('/forgot-password', validateForgotPassword, userController.forgotPassword);
router.patch('/change-password', validateChangePassword, middlewareUtils.checkLogin, userController.changePassword);
router.patch('/update-userInfo', validateUpdateUser, middlewareUtils.checkLogin, userController.updateUserInfo);
module.exports = router;
