const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const jwtService = require('../services/jwt.service');
const authService = require('../services/auth.service');

const generateTokenCtrl = asyncHandler(async (req, res) => {
  const token = jwtService.generate({ id: req.user.id, role: req.user.role });
  successResponse(res, 'Token generated successfully', { token });
});

const verifyTokenCtrl = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) return errorResponse(res, 'Token required', 'No token provided', 400);
  const decoded = jwtService.verify(token);
  successResponse(res, 'Token is valid', { valid: true, decoded });
});

const refreshTokenCtrl = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) return errorResponse(res, 'Token required', 'No token provided', 400);
  const newToken = jwtService.refresh(token);
  successResponse(res, 'Token refreshed successfully', { token: newToken });
});

const revokeTokenCtrl = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) return errorResponse(res, 'Token required', 'No token provided', 400);
  jwtService.verify(token);
  successResponse(res, 'Token revoked successfully');
});

const getProfile = asyncHandler(async (req, res) => {
  const data = await authService.getProfile(req.user.id);
  successResponse(res, 'Profile fetched successfully', data);
});

const getDashboard = asyncHandler(async (req, res) => {
  successResponse(res, 'Dashboard data', { user: req.user });
});

const getPrivateDatasets = asyncHandler(async (req, res) => {
  successResponse(res, 'Private datasets', { message: 'Protected dataset access' });
});

const getPrivateAnalytics = asyncHandler(async (req, res) => {
  successResponse(res, 'Private analytics', { message: 'Admin analytics access' });
});

module.exports = {
  generateToken: generateTokenCtrl, verifyToken: verifyTokenCtrl,
  refreshToken: refreshTokenCtrl, revokeToken: revokeTokenCtrl,
  getProfile, getDashboard, getPrivateDatasets, getPrivateAnalytics,
};
