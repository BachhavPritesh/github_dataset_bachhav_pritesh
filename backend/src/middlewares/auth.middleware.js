const { verifyToken } = require('../utils/jwtHelper');
const { errorResponse } = require('../utils/apiResponse');

const verifyJWT = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return errorResponse(res, 'Authentication required', 'No token provided', 401);
  }
  try {
    const token = header.split(' ')[1];
    req.user = verifyToken(token);
    next();
  } catch (err) {
    return errorResponse(res, 'Invalid or expired token', err.message, 401);
  }
};

module.exports = verifyJWT;
