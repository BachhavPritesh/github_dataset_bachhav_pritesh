// validation middleware for express-validator
// checks the validation result and returns formatted errors if any rules failed

const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/apiResponse');

const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);          // collect validation errors from previous middleware

  if (!errors.isEmpty()) {
    // map errors to a consistent field + message structure
    const fieldErrors = errors.array().map((e) => ({ field: e.path, message: e.msg }));
    return errorResponse(res, 'Validation failed', fieldErrors, 400);
  }

  next(); // no validation errors, proceed to route handler
};

module.exports = validateMiddleware;
