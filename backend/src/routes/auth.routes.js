// authentication routes — maps auth endpoints to auth controller functions

const express = require('express');
const { authLimiter } = require('../middlewares/rateLimiter.middleware');
const authController = require('../controllers/auth.controller');
const verifyJWT = require('../middlewares/auth.middleware');
const validateMiddleware = require('../middlewares/validate.middleware');
const { registerRules, loginRules } = require('../validators/auth.validator');

const router = express.Router();

router.post('/register', registerRules, validateMiddleware, authController.register);          // POST /auth/register
router.post('/login', authLimiter, loginRules, validateMiddleware, authController.login);      // POST /auth/login (rate limited)
router.post('/logout', authController.logout);                                                  // POST /auth/logout
router.get('/profile', verifyJWT, authController.getProfile);                                  // GET /auth/profile (auth)
router.patch('/profile', verifyJWT, authController.updateProfile);                             // PATCH /auth/profile (auth)
router.post('/forgot-password', authController.forgotPassword);                                 // POST /auth/forgot-password
router.post('/reset-password', authController.resetPassword);                                   // POST /auth/reset-password
router.post('/send-otp', authController.sendOTP);                                               // POST /auth/send-otp
router.post('/verify-email', authController.sendOTP);                                           // POST /auth/verify-email
router.post('/change-password', verifyJWT, authController.changePassword);                      // POST /auth/change-password (auth)

module.exports = router;
