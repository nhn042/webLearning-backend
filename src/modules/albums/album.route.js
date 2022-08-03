const express = require('express');
const router = express.Router();
const { checkLogin } = require('../../utils/middleware.utils');
const albumController = require('./album.controller');

router.post('/album', checkLogin, albumController.createAlbum);
router.put('/album/:id', checkLogin, albumController.updateAlbum);
router.delete('/album/:id', checkLogin, albumController.deleteAlbum);

module.exports = router;
