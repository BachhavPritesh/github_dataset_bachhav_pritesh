const express = require('express');
const { authLimiter } = require('../middlewares/rateLimiter.middleware');
const authController = require('../controllers/auth.controller');
const verifyJWT = require('../middlewares/auth.middleware');
const validateMiddleware = require('../middlewares/validate.middleware');
const { registerRules, loginRules } = require('../validators/auth.validator');

const router = express.Router();

router.post('/register', registerRules, validateMiddleware, authController.register);
router.post('/login', authLimiter, loginRules, validateMiddleware, authController.login);
router.post('/logout', authController.logout);
router.get('/profile', verifyJWT, authController.getProfile);
router.patch('/profile', verifyJWT, authController.updateProfile);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/send-otp', authController.sendOTP);
router.post('/verify-email', authController.sendOTP);
router.post('/change-password', verifyJWT, authController.changePassword);

module.exports = router;
