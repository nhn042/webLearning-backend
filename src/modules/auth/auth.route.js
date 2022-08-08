const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
require('dotenv').config({ path: './src/configs/.env' });
const authValidate = require('./auth.validation');

/**
 * @swagger
 * /login:
 *  post:
 *      summary: Login
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     account :
 *                          type: string
 *                     password:
 *                          type: string
 *                   required:
 *                     - account
 *                     - password
 *      responses:
 *          200:
 *              description: login success
 *          500:
 *              description: Account or password is wrong
 * /register:
 *  post:
 *      summary: Register
 *      tags: [Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                     username :
 *                          type: string
 *                     password :
 *                          type: string
 *                     email:
 *                          type: string
 *                     dob :
 *                          type: string
 *                     fullname :
 *                          type: string
 *                   required:
 *                     - username
 *                     - password
 *                     - email
 *                     - dob
 *                     - fullname
 *      responses:
 *          200:
 *              description: register success
 *          500:
 *              description: Register fail
 */

router.post('/login', authValidate.validateLogin, authController.login);

router.post('/register', authValidate.validateRegister, authController.register);

module.exports = router;
