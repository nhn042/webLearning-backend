const express = require('express');
const router = express.Router();
const viTayController = require('./viTay.controller');
const middlewareUtils = require('../../utils/middleware.utils');
const auth = require('../../middleware/author');

router.get('/getAll', viTayController.getAll);
router.get('/viet', viTayController.translateVietToTay);
router.get('/tay', viTayController.translateTayToViet);

module.exports = router;
