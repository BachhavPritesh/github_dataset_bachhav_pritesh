// JWT helper utilities for token generation and verification
// wraps the jsonwebtoken library with application-level config

const jwt = require('jsonwebtoken');
const env = require('../config/env');

// creates a signed JWT with the given payload and configured expiration
const generateToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
};

// verifies and decodes a JWT, throws if token is invalid or expired
const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
