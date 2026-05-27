const express = require('express');
const filterController = require('../controllers/filter.controller');

const router = express.Router();

router.get('/functions', filterController.filterFunctions);
router.get('/classes', filterController.filterClasses);
router.get('/documentation', filterController.filterDocumentation);
router.get('/readme', filterController.filterReadme);
router.get('/python', filterController.filterPython);
router.get('/ai', filterController.filterAI);
router.get('/ml', filterController.filterML);
router.get('/github', filterController.filterGithub);
router.get('/frameworks', filterController.filterFrameworks);
router.get('/docstrings', filterController.filterDocstrings);

module.exports = router;
