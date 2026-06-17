// role-based access control middleware
// restricts route access to specific user roles

const { errorResponse } = require('../utils/apiResponse');

// factory function that accepts allowed roles and returns a middleware
// usage: requireRole('admin') or requireRole('admin', 'moderator')
const requireRole = (...roles) => {
  return (req, res, next) => {
    // req.user is set by the verifyJWT middleware running before this
    if (!req.user || !roles.includes(req.user.role)) {
      return errorResponse(res, 'Insufficient permissions', 'Admin access required', 403);
    }
    next(); // user has an allowed role, proceed
  };
};

module.exports = requireRole;
