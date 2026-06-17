// authentication middleware
// extracts Bearer token from the Authorization header, verifies it, and attaches the decoded user payload to the request

const { verifyToken } = require('../utils/jwtHelper');
const { errorResponse } = require('../utils/apiResponse');

const verifyJWT = (req, res, next) => {
  const header = req.headers.authorization;

  // reject requests without a Bearer token
  if (!header || !header.startsWith('Bearer ')) {
    return errorResponse(res, 'Authentication required', 'No token provided', 401);
  }

  try {
    const token = header.split(' ')[1];   // extract the token part after "Bearer "
    req.user = verifyToken(token);         // decode and verify; attaches { id, role, iat, exp } to req.user
    next();                                // proceed to the next middleware or route handler
  } catch (err) {
    // token is malformed, expired, or signed with a different secret
    return errorResponse(res, 'Invalid or expired token', err.message, 401);
  }
};

module.exports = verifyJWT;
