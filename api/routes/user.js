const express = require('express');
const router = express.Router();

const UserValidate = require('../validations/user');
const UserController = require('../controllers/user');


router.post('/login', UserValidate.login, UserController.login);


module.exports = router;