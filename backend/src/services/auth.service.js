const crypto = require('crypto');
const User = require('../models/User.model');
const { generateToken } = require('../utils/jwtHelper');

const register = async (name, email, password) => {
  const user = await User.create({ name, email, password });
  const token = generateToken({ id: user._id, role: user.role });
  return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return null;
  }
  const token = generateToken({ id: user._id, role: user.role });
  return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
};

const getProfile = async (userId) => {
  const user = await User.findById(userId).lean();
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }
  return user;
};

const updateProfile = async (userId, body) => {
  const allowed = ['name', 'email'];
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

const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findById(userId).select('+password');
  if (!user || !(await user.comparePassword(oldPassword))) {
    const err = new Error('Current password is incorrect');
    err.statusCode = 400;
    throw err;
  }
  user.password = newPassword;
  await user.save();
  return { message: 'Password changed successfully' };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return null;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpiry = Date.now() + 15 * 60 * 1000;
  await user.save({ validateBeforeSave: false });
  return otp;
};

const resetPassword = async (email, otp, newPassword) => {
  const user = await User.findOne({ email, otp, otpExpiry: { $gt: Date.now() } });
  if (!user) return null;
  user.password = newPassword;
  user.otp = undefined;
  user.otpExpiry = undefined;
  user.isVerified = true;
  await user.save();
  return user;
};

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
