// JWT routes — token management and JWT-protected endpoints

const express = require('express');
const verifyJWT = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const jwtController = require('../controllers/jwt.controller');

const router = express.Router();

router.post('/generate-token', verifyJWT, jwtController.generateToken);          // POST /jwt/generate-token
router.post('/verify-token', jwtController.verifyToken);                          // POST /jwt/verify-token
router.post('/refresh-token', jwtController.refreshToken);                        // POST /jwt/refresh-token
router.delete('/revoke-token', jwtController.revokeToken);                        // DELETE /jwt/revoke-token
router.get('/profile', verifyJWT, jwtController.getProfile);                      // GET /jwt/profile
router.get('/dashboard', verifyJWT, jwtController.getDashboard);                  // GET /jwt/dashboard
router.get('/private-datasets', verifyJWT, jwtController.getPrivateDatasets);     // GET /jwt/private-datasets
router.get('/private-analytics', verifyJWT, requireRole('admin'), jwtController.getPrivateAnalytics); // GET /jwt/private-analytics

module.exports = router;
