const express = require('express');
const router = express.Router();
const authorization = require('../middleware/check-auth');

const UserValidate = require('../validations/user');
const UserController = require('../controllers/user');


router.post('/login', UserValidate.login, UserController.login);
router.post('/logout', authorization, UserController.logout);


module.exports = router;