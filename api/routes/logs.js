const express = require('express');
const router = express.Router();
const authorization = require('../middleware/check-auth');
const sitekey = require('../middleware/check-sitekey');
const active = require('../middleware/check-active');

const LoggerController = require('../controllers/logs');


router.post('/capture', sitekey, active, LoggerController.capture);
router.get('/', authorization, LoggerController.get_all);
router.get('/:logId', authorization, LoggerController.get_single);
router.post('/getFiltered', authorization, LoggerController.get_filtered);


module.exports = router;