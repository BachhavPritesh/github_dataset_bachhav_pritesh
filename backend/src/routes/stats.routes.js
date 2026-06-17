// stats routes — simple count endpoints for dashboard KPIs

const express = require('express');
const statsController = require('../controllers/stats.controller');

const router = express.Router();

router.get('/datasets/count', statsController.totalCount);          // GET /stats/datasets/count
router.get('/datasets/functions', statsController.functionCount);    // GET /stats/datasets/functions
router.get('/datasets/classes', statsController.classCount);         // GET /stats/datasets/classes
router.get('/datasets/documentation', statsController.docCount);     // GET /stats/datasets/documentation
router.get('/datasets/readme', statsController.readmeCount);         // GET /stats/datasets/readme
router.get('/datasets/repos', statsController.repoCount);            // GET /stats/datasets/repos
router.get('/datasets/languages', statsController.languageCount);    // GET /stats/datasets/languages
router.get('/datasets/frameworks', statsController.frameworkCount);  // GET /stats/datasets/frameworks
router.get('/datasets/github', statsController.githubCount);         // GET /stats/datasets/github
router.get('/datasets/ai', statsController.aiCount);                 // GET /stats/datasets/ai

module.exports = router;
