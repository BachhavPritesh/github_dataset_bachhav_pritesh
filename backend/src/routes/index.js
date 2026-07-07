// main route registry — mounts all sub-routers under their respective path prefixes

const express = require('express');
const { generalLimiter } = require('../middlewares/rateLimiter.middleware');

const datasetRouter = require('./dataset.routes');
const searchRouter = require('./search.routes');
const filterRouter = require('./filter.routes');
const analyticsRouter = require('./analytics.routes');
const statsRouter = require('./stats.routes');
const authRouter = require('./auth.routes');
const jwtRouter = require('./jwt.routes');
const adminRouter = require('./admin.routes');
const protectedRouter = require('./protected.routes');
const blogRouter = require('./blog.routes');

const router = express.Router();

// apply general rate limiter to all routes
router.use(generalLimiter);

// mount sub-routers — note: /datasets/filter must come before /datasets to avoid route conflict
router.use('/datasets/filter', filterRouter);
router.use('/datasets', datasetRouter);
router.use('/search', searchRouter);
router.use('/analytics', analyticsRouter);
router.use('/stats', statsRouter);
router.use('/auth', authRouter);
router.use('/jwt', jwtRouter);
router.use('/admin', adminRouter);
router.use('/protected', protectedRouter);
router.use('/blogs', blogRouter);

module.exports = router;
