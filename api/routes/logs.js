const express = require('express');
const router = express.Router();
const authorization = require('../middleaware/check-auth');

const LoggerController = require('../controllers/logs');


router.post('/capture', LoggerController.capture);
router.get('/', authorization, LoggerController.get_all);
router.get('/:logId', authorization, LoggerController.get_single);
router.post('/getFiltered', authorization, LoggerController.get_filtered);


module.exports = router;