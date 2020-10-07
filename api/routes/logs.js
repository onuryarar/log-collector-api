const express = require('express');
const router = express.Router();

const LoggerController = require('../controllers/logs');


router.post('/create', LoggerController.create);
router.get('/', LoggerController.get_all);
router.get('/:logId', LoggerController.get_single);
router.post('/getFiltered', LoggerController.get_filtered);


module.exports = router;