// filter routes — convenience filter endpoints for common dataset queries

const express = require('express');
const filterController = require('../controllers/filter.controller');

const router = express.Router();

router.get('/functions', filterController.filterFunctions);     // GET /datasets/filter/functions
router.get('/classes', filterController.filterClasses);          // GET /datasets/filter/classes
router.get('/documentation', filterController.filterDocumentation); // GET /datasets/filter/documentation
router.get('/readme', filterController.filterReadme);            // GET /datasets/filter/readme
router.get('/python', filterController.filterPython);            // GET /datasets/filter/python
router.get('/ai', filterController.filterAI);                    // GET /datasets/filter/ai
router.get('/ml', filterController.filterML);                    // GET /datasets/filter/ml
router.get('/github', filterController.filterGithub);            // GET /datasets/filter/github
router.get('/frameworks', filterController.filterFrameworks);    // GET /datasets/filter/frameworks
router.get('/docstrings', filterController.filterDocstrings);    // GET /datasets/filter/docstrings

module.exports = router;
