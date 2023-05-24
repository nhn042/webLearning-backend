const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const dotenv = require("dotenv");
const authValidate = require('./auth.validation');

router.post('/login', authValidate.validateLogin, authController.login);

router.post('/register', authController.register);

module.exports = router;
