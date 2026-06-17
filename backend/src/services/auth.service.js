// authentication service — handles user registration, login, profile management, password flows, and OTP

const crypto = require('crypto');
const User = require('../models/User.model');
const { generateToken } = require('../utils/jwtHelper');

// creates a new user and returns the user object with a JWT token
const register = async (name, email, password) => {
  const user = await User.create({ name, email, password });
  const token = generateToken({ id: user._id, role: user.role });
  return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
};

// authenticates a user by email and password
// returns null if credentials are invalid
const login = async (email, password) => {
  const user = await User.findOne({ email }).select('+password'); // explicitly include password (excluded by default)
  if (!user || !(await user.comparePassword(password))) {
    return null; // user not found or password doesn't match
  }
  const token = generateToken({ id: user._id, role: user.role });
  return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
};

// returns the profile of a user by their ID
const getProfile = async (userId) => {
  const user = await User.findById(userId).lean();
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }
  return user;
};

// updates a user's profile (only name and email fields are allowed)
const updateProfile = async (userId, body) => {
  const allowed = ['name', 'email'];             // whitelist of updatable fields
  const updates = {};
  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key];
  }
  const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).lean();
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }
  return user;
};

// changes the authenticated user's password after verifying the old password
const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId).select('+password'); // need password for comparison
  if (!user || !(await user.comparePassword(oldPassword))) {
    const err = new Error('Current password is incorrect');
    err.statusCode = 400;
    throw err;
  }
  user.password = newPassword; // the pre-save hook will hash this automatically
  await user.save();
  return { message: 'Password changed successfully' };
};

// generates a 6-digit OTP for password reset, stores it with a 15-minute expiry
const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return null;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generate 6-digit OTP
  user.otp = otp;
  user.otpExpiry = Date.now() + 15 * 60 * 1000; // valid for 15 minutes
  await user.save({ validateBeforeSave: false }); // skip validation (only modifying otp fields)
  return otp;
};

// resets password using email, OTP (which must be valid and unexpired), and new password
const resetPassword = async (email, otp, newPassword) => {
  const user = await User.findOne({ email, otp, otpExpiry: { $gt: Date.now() } }); // find by email + valid OTP
  if (!user) return null;
  user.password = newPassword; // pre-save hook will hash this
  user.otp = undefined;        // clear OTP after successful reset
  user.otpExpiry = undefined;
  user.isVerified = true;      // mark email as verified
  await user.save();
  return user;
};

// generates a 6-digit OTP for email verification (same logic as forgotPassword)
const sendOTP = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return null;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpiry = Date.now() + 15 * 60 * 1000;
  await user.save({ validateBeforeSave: false });
  return otp;
};

module.exports = { register, login, getProfile, updateProfile, changePassword, forgotPassword, resetPassword, sendOTP };
