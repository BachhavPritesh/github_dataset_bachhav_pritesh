// auth controller — handles authentication, profile, and password management HTTP requests

const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const authService = require('../services/auth.service');

// POST /auth/register — create a new user account
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await authService.register(name, email, password);
  successResponse(res, 'User registered successfully', result, null, 201);
});

// POST /auth/login — authenticate with email and password, returns JWT
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  if (!result) return errorResponse(res, 'Invalid credentials', 'Email or password is incorrect', 401);
  successResponse(res, 'Login successful', result);
});

// POST /auth/logout — stateless logout (returns success, no token invalidation)
const logout = asyncHandler(async (req, res) => {
  successResponse(res, 'Logged out successfully');
});

// GET /auth/profile — fetch authenticated user's profile (requires auth)
const getProfile = asyncHandler(async (req, res) => {
  const data = await authService.getProfile(req.user.id);
  successResponse(res, 'Profile fetched successfully', data);
});

// PATCH /auth/profile — update authenticated user's name/email (requires auth)
const updateProfile = asyncHandler(async (req, res) => {
  const data = await authService.updateProfile(req.user.id, req.body);
  successResponse(res, 'Profile updated successfully', data);
});

// POST /auth/change-password — change password (requires auth + old password)
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const data = await authService.changePassword(req.user.id, oldPassword, newPassword);
  successResponse(res, 'Password changed successfully', data);
});

// POST /auth/forgot-password — generate OTP for password reset
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = await authService.forgotPassword(email);
  if (!otp) return errorResponse(res, 'User not found', 'No account with that email', 404);
  successResponse(res, 'OTP sent successfully', { otp });
});

// POST /auth/reset-password — reset password using email + OTP + new password
const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await authService.resetPassword(email, otp, newPassword);
  if (!user) return errorResponse(res, 'Invalid or expired OTP', 'Reset failed', 400);
  successResponse(res, 'Password reset successfully');
});

// POST /auth/send-otp — send OTP for email verification
const sendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = await authService.sendOTP(email);
  if (!otp) return errorResponse(res, 'User not found', 'No account with that email', 404);
  successResponse(res, 'OTP sent successfully', { otp });
});

module.exports = { register, login, logout, getProfile, updateProfile, changePassword, forgotPassword, resetPassword, sendOTP };
