const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests', error: 'Rate limit exceeded' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many auth attempts', error: 'Rate limit exceeded' },
});

const searchLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { success: false, message: 'Too many search requests', error: 'Rate limit exceeded' },
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many admin requests', error: 'Rate limit exceeded' },
});

module.exports = { generalLimiter, authLimiter, searchLimiter, adminLimiter };
