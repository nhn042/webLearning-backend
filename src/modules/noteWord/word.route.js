const express = require('express');
const router = express.Router();
const wordController = require('./word.controller');
const auth = require('../../middleware/author');

router.get('/wordNew', wordController.getWord);
router.post('/update-word', wordController.updateWord);
module.exports = router;
