// search routes — text search across datasets with rate limiting

const express = require('express');
const { searchLimiter } = require('../middlewares/rateLimiter.middleware');
const searchController = require('../controllers/search.controller');

const router = express.Router();

router.get('/datasets', searchLimiter, searchController.searchDatasets); // GET /search/datasets?q=

module.exports = router;
