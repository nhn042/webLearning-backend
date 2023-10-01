const express = require('express');
const router = express.Router();
const viTayController = require('./viTay.controller');
const middlewareUtils = require('../../utils/middleware.utils');
const auth = require('../../middleware/author');

router.get('/find/getAll', viTayController.getAll);
router.get('/find/viet', viTayController.translateVietToTay);
router.get('/find/tay', viTayController.translateTayToViet);

module.exports = router;
