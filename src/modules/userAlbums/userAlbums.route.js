const express = require('express');
const router = express.Router();
const userAlbumsService = require('./userAlbums.service');
const { checkLogin } = require('../../utils/middleware.utils');

router.post('/createAlbums', checkLogin, userAlbumsService.createAlbum);
