// global error handling middleware
// catches errors from the entire application and returns standardized JSON error responses

const { errorResponse } = require('../utils/apiResponse');

const errorMiddleware = (err, req, res, next) => {
  console.error(`[ERROR] ${err.name}: ${err.message}`);

  // Mongoose validation error — one or more schema fields failed validation
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return errorResponse(res, 'Validation failed', messages.join(', '), 400);
  }

  // MongoDB duplicate key error (code 11000) — inserting a document that violates a unique index
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return errorResponse(res, 'Duplicate field', `${field} already exists`, 409);
  }

  // Mongoose CastError — invalid ObjectId format or type mismatch
  if (err.name === 'CastError') {
    return errorResponse(res, 'Invalid ID format', err.message, 400);
  }

  // JWT errors — token is malformed or has expired
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Invalid or expired token', err.message, 401);
  }

  // fallback for custom errors or unexpected server errors
  const statusCode = err.statusCode || 500;
  errorResponse(res, err.message || 'Internal Server Error', null, statusCode);
};

module.exports = errorMiddleware;
