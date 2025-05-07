const express = require('express');
const router = express.Router();
const videoController = require('./video.controller');
const middlewareUtils = require('../../utils/middleware.utils');
const auth = require('../../middleware/author');    

router.get('/getAll', videoController.getAllVideo);

module.exports = router;
