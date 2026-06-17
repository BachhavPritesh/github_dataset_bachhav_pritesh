// JWT service — delegates token operations to the JWT helper utility
// exists as a service layer so controllers don't depend directly on utilities

const { generateToken, verifyToken } = require('../utils/jwtHelper');

// creates a signed JWT from the given payload
const generate = (payload) => generateToken(payload);

// verifies a token and returns the decoded payload
const verify = (token) => {
  const decoded = verifyToken(token);
  return decoded;
};

// verifies an existing token and issues a new one with the same identity
const refresh = (oldToken) => {
  const decoded = verifyToken(oldToken);
  const newToken = generateToken({ id: decoded.id, role: decoded.role });
  return newToken;
};

module.exports = { generate, verify, refresh };
