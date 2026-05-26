const { errorResponse } = require('../utils/apiResponse');

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return errorResponse(res, 'Insufficient permissions', 'Admin access required', 403);
    }
    next();
  };
};

module.exports = requireRole;
