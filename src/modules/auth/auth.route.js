const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
require('dotenv').config({ path: './src/configs/.env' });
const authValidate = require('./auth.validation');

router.post('/login', authValidate.validateLogin, authController.login);

router.post(
    '/register',
    authValidate.validateRegister,
    authController.register
);

module.exports = router;
