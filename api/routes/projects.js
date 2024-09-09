const express = require('express');
const router = express.Router();
const authorization = require('../middleware/check-auth');

const ProjectController = require('../controllers/projects');


router.post('/create', authorization, ProjectController.create);
router.get('/', authorization, ProjectController.get_all);
router.get('/:projectId', authorization, ProjectController.get_single);


module.exports = router;