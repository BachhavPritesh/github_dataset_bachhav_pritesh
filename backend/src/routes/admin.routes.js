// admin routes — admin-protected endpoints for dataset management and analytics overview

const express = require('express');
const verifyJWT = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const { adminLimiter } = require('../middlewares/rateLimiter.middleware');
const datasetController = require('../controllers/dataset.controller');
const analyticsController = require('../controllers/analytics.controller');

const router = express.Router();

// admin-only dataset list with rate limiting
router.get('/datasets', verifyJWT, requireRole('admin'), adminLimiter, datasetController.getAllDatasets);

// admin-only combined analytics endpoint
router.get('/analytics', verifyJWT, requireRole('admin'), async (req, res, next) => {
  const data = {
    typeAnalysis: await analyticsController.typeAnalysis(req, res, next),
    repoAnalysis: await analyticsController.repoAnalysis(req, res, next),
  };
});

module.exports = router;
