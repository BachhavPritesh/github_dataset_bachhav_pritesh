const { errorResponse } = require('../utils/apiResponse');

const errorMiddleware = (err, req, res, next) => {
  console.error(`[ERROR] ${err.name}: ${err.message}`);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return errorResponse(res, 'Validation failed', messages.join(', '), 400);
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return errorResponse(res, 'Duplicate field', `${field} already exists`, 409);
  }
  if (err.name === 'CastError') {
    return errorResponse(res, 'Invalid ID format', err.message, 400);
  }
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Invalid or expired token', err.message, 401);
  }

  const statusCode = err.statusCode || 500;
  errorResponse(res, err.message || 'Internal Server Error', null, statusCode);
};

module.exports = errorMiddleware;
