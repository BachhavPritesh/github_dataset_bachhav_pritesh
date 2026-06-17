// analytics routes — aggregation endpoints for the analytics dashboard

const express = require('express');
const analyticsController = require('../controllers/analytics.controller');

const router = express.Router();

router.get('/datasets/type-analysis', analyticsController.typeAnalysis);          // GET /analytics/datasets/type-analysis
router.get('/datasets/repo-analysis', analyticsController.repoAnalysis);           // GET /analytics/datasets/repo-analysis
router.get('/datasets/source-analysis', analyticsController.sourceAnalysis);       // GET /analytics/datasets/source-analysis
router.get('/datasets/framework-analysis', analyticsController.frameworkAnalysis); // GET /analytics/datasets/framework-analysis
router.get('/datasets/language-analysis', analyticsController.languageAnalysis);   // GET /analytics/datasets/language-analysis
router.get('/datasets/code-analysis', analyticsController.codeAnalysis);           // GET /analytics/datasets/code-analysis
router.get('/datasets/doc-analysis', analyticsController.docAnalysis);             // GET /analytics/datasets/doc-analysis
router.get('/datasets/readme-analysis', analyticsController.readmeAnalysis);       // GET /analytics/datasets/readme-analysis
router.get('/datasets/ml-analysis', analyticsController.mlAnalysis);               // GET /analytics/datasets/ml-analysis
router.get('/datasets/ai-analysis', analyticsController.aiAnalysis);               // GET /analytics/datasets/ai-analysis

module.exports = router;
