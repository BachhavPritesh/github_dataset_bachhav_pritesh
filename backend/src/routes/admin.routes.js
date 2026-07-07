// admin routes — admin-protected endpoints for dataset management and analytics overview

const express = require('express');
const verifyJWT = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const { adminLimiter } = require('../middlewares/rateLimiter.middleware');
const datasetController = require('../controllers/dataset.controller');
const analyticsService = require('../services/analytics.service');

const router = express.Router();

// admin-only dataset list with rate limiting
router.get('/datasets', verifyJWT, requireRole('admin'), adminLimiter, datasetController.getAllDatasets);

// admin-only combined analytics endpoint
router.get('/analytics', verifyJWT, requireRole('admin'), async (req, res, next) => {
  try {
    const [typeAnalysis, repoAnalysis] = await Promise.all([
      analyticsService.typeAnalysis(),
      analyticsService.repoAnalysis(),
    ]);
    res.json({ success: true, data: { typeAnalysis, repoAnalysis } });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
