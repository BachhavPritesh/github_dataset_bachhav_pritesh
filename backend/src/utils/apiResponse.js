// standardized API response helpers
// ensures consistent JSON response format across all endpoints

// builds a success response with optional pagination metadata
const successResponse = (res, message = 'Success', data = null, pagination = null, statusCode = 200) => {
  const body = { success: true, message, data };
  if (pagination) body.pagination = pagination; // attach pagination info if provided
  return res.status(statusCode).json(body);
};

// builds an error response with optional error details
const errorResponse = (res, message = 'Internal Server Error', error = null, statusCode = 500) => {
  return res.status(statusCode).json({ success: false, message, error });
};

module.exports = { successResponse, errorResponse };
