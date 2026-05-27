const successResponse = (res, message = 'Success', data = null, pagination = null, statusCode = 200) => {
  const body = { success: true, message, data };
  if (pagination) body.pagination = pagination;
  return res.status(statusCode).json(body);
};

const errorResponse = (res, message = 'Internal Server Error', error = null, statusCode = 500) => {
  return res.status(statusCode).json({ success: false, message, error });
};

module.exports = { successResponse, errorResponse };
