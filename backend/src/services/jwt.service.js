const { generateToken, verifyToken } = require('../utils/jwtHelper');

const generate = (payload) => generateToken(payload);

const verify = (token) => {
  const decoded = verifyToken(token);
  return decoded;
};

const refresh = (oldToken) => {
  const decoded = verifyToken(oldToken);
  const newToken = generateToken({ id: decoded.id, role: decoded.role });
  return newToken;
};

module.exports = { generate, verify, refresh };
