const { checkLogin } = require('../../utils/middleware.utils');
const express = require('express');
const router = express.Router();
const photoController = require('./photo.controller');
const { uploadPhotos } = require('../../utils/upload.utils');

router.post('/photos', checkLogin, uploadPhotos, photoController.addPhotos);

module.exports = router;
