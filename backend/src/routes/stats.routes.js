const express = require('express');
const statsController = require('../controllers/stats.controller');

const router = express.Router();

router.get('/datasets/count', statsController.totalCount);
router.get('/datasets/functions', statsController.functionCount);
router.get('/datasets/classes', statsController.classCount);
router.get('/datasets/documentation', statsController.docCount);
router.get('/datasets/readme', statsController.readmeCount);
router.get('/datasets/repos', statsController.repoCount);
router.get('/datasets/languages', statsController.languageCount);
router.get('/datasets/frameworks', statsController.frameworkCount);
router.get('/datasets/github', statsController.githubCount);
router.get('/datasets/ai', statsController.aiCount);

module.exports = router;
