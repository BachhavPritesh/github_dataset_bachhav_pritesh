// User model — represents an authenticated user of the DevDB platform
// includes password hashing and comparison methods for secure authentication

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ROLES } = require('../constants/enums');

// ---------- Schema Definition ----------
const userSchema = new mongoose.Schema({
  name:       { type: String, required: true, trim: true },              // display name
  email:      { type: String, required: true, unique: true, lowercase: true, trim: true }, // login identifier
  password:   { type: String, required: true, minlength: 6, select: false }, // hashed password, excluded from queries by default
  role:       { type: String, enum: ROLES, default: 'user' },           // access control role
  isVerified: { type: Boolean, default: false },                         // email verification status
  otp:        { type: String },                                          // one-time password for email verification / password reset
  otpExpiry:  { type: Date },                                            // expiration timestamp for the OTP
}, { timestamps: true });

// ---------- Pre-save Hook ----------
// hashes the password with bcrypt (salt rounds = 10) whenever it is set or modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // skip if password hasn't changed
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ---------- Instance Method ----------
// compares a candidate password against the stored bcrypt hash
// returns true if passwords match, false otherwise
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', userSchema);
