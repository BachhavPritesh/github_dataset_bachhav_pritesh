const express = require('express');
const verifyJWT = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const jwtController = require('../controllers/jwt.controller');

const router = express.Router();

router.post('/generate-token', verifyJWT, jwtController.generateToken);
router.post('/verify-token', jwtController.verifyToken);
router.post('/refresh-token', jwtController.refreshToken);
router.delete('/revoke-token', jwtController.revokeToken);
router.get('/profile', verifyJWT, jwtController.getProfile);
router.get('/dashboard', verifyJWT, jwtController.getDashboard);
router.get('/private-datasets', verifyJWT, jwtController.getPrivateDatasets);
router.get('/private-analytics', verifyJWT, requireRole('admin'), jwtController.getPrivateAnalytics);

module.exports = router;
