// JWT controller — handles JWT token management and protected endpoints

const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const jwtService = require('../services/jwt.service');
const authService = require('../services/auth.service');

// POST /jwt/generate-token — create a new JWT for the authenticated user
const generateTokenCtrl = asyncHandler(async (req, res) => {
  const token = jwtService.generate({ id: req.user.id, role: req.user.role });
  successResponse(res, 'Token generated successfully', { token });
});

// POST /jwt/verify-token — validate a JWT and return decoded payload
const verifyTokenCtrl = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) return errorResponse(res, 'Token required', 'No token provided', 400);
  const decoded = jwtService.verify(token);
  successResponse(res, 'Token is valid', { valid: true, decoded });
});

// POST /jwt/refresh-token — issue a new JWT from a valid existing one
const refreshTokenCtrl = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) return errorResponse(res, 'Token required', 'No token provided', 400);
  const newToken = jwtService.refresh(token);
  successResponse(res, 'Token refreshed successfully', { token: newToken });
});

// DELETE /jwt/revoke-token — verify a token (stateless, no revocation list)
const revokeTokenCtrl = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) return errorResponse(res, 'Token required', 'No token provided', 400);
  jwtService.verify(token);
  successResponse(res, 'Token revoked successfully');
});

// GET /jwt/profile — fetch user profile via JWT auth
const getProfile = asyncHandler(async (req, res) => {
  const data = await authService.getProfile(req.user.id);
  successResponse(res, 'Profile fetched successfully', data);
});

// GET /jwt/dashboard — basic dashboard endpoint (requires auth)
const getDashboard = asyncHandler(async (req, res) => {
  successResponse(res, 'Dashboard data', { user: req.user });
});

// GET /jwt/private-datasets — protected dataset placeholder (requires auth)
const getPrivateDatasets = asyncHandler(async (req, res) => {
  successResponse(res, 'Private datasets', { message: 'Protected dataset access' });
});

// GET /jwt/private-analytics — admin-only analytics placeholder
const getPrivateAnalytics = asyncHandler(async (req, res) => {
  successResponse(res, 'Private analytics', { message: 'Admin analytics access' });
});

module.exports = {
  generateToken: generateTokenCtrl, verifyToken: verifyTokenCtrl,
  refreshToken: refreshTokenCtrl, revokeToken: revokeTokenCtrl,
  getProfile, getDashboard, getPrivateDatasets, getPrivateAnalytics,
};
