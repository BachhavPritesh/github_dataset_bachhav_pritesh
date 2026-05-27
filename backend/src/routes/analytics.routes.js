const express = require('express');
const analyticsController = require('../controllers/analytics.controller');

const router = express.Router();

router.get('/datasets/type-analysis', analyticsController.typeAnalysis);
router.get('/datasets/repo-analysis', analyticsController.repoAnalysis);
router.get('/datasets/source-analysis', analyticsController.sourceAnalysis);
router.get('/datasets/framework-analysis', analyticsController.frameworkAnalysis);
router.get('/datasets/language-analysis', analyticsController.languageAnalysis);
router.get('/datasets/code-analysis', analyticsController.codeAnalysis);
router.get('/datasets/doc-analysis', analyticsController.docAnalysis);
router.get('/datasets/readme-analysis', analyticsController.readmeAnalysis);
router.get('/datasets/ml-analysis', analyticsController.mlAnalysis);
router.get('/datasets/ai-analysis', analyticsController.aiAnalysis);

module.exports = router;
