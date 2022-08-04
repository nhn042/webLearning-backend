const { checkLogin } = require('../../utils/middleware.utils');
const express = require('express');
const router = express.Router();
const photoController = require('./photo.controller');
const { uploadPhotos } = require('../../utils/upload.utils');

router.post('/photos', checkLogin, uploadPhotos.array('img', 5), photoController.addPhotos);

router.delete('/photos/:id', checkLogin, photoController.deletePhoto);
router.put('/photos/:id', checkLogin, photoController.updatePhoto);

module.exports = router;
