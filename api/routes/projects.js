const express = require('express');
const router = express.Router();
const authorization = require('../middleaware/check-auth');

const ProjectController = require('../controllers/projects');


router.get('/', authorization, ProjectController.get_all);
router.get('/:projectId', authorization, ProjectController.get_single);


module.exports = router;