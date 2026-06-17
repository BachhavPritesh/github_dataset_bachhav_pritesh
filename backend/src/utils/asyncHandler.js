// wraps an async Express route handler to catch rejected promises
// eliminates the need for try/catch blocks in every controller
const asyncHandler = (fn) => (req, res, next) => {
  // wrap the function call in Promise.resolve to handle both async and sync errors
  // any thrown error or rejected promise is forwarded to the next middleware (global error handler)
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
