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
