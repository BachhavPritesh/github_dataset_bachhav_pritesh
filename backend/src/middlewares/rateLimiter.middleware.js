// rate limiting middleware configuration
// protects endpoints from abuse by limiting requests per IP within a time window

const rateLimit = require('express-rate-limit');

// general limiter — applied to all API routes (100 requests per 15 minutes)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests', error: 'Rate limit exceeded' },
});

// strict limiter for authentication endpoints to prevent brute-force attacks (10 requests per 15 min)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many auth attempts', error: 'Rate limit exceeded' },
});

// moderate limiter for search endpoints (50 requests per 15 min)
const searchLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { success: false, message: 'Too many search requests', error: 'Rate limit exceeded' },
});

// admin limiter for sensitive admin operations (20 requests per 15 min)
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many admin requests', error: 'Rate limit exceeded' },
});

module.exports = { generalLimiter, authLimiter, searchLimiter, adminLimiter };
