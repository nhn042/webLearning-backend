const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './src/configs/.env' });

router.post('/login', authController.login);

router.post('/register', authController.register);

module.exports = router;
