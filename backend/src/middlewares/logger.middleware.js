// request logging middleware
// logs each HTTP request's method, URL, status code, and duration on response completion

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();                          // capture the start time

  // listen for the 'finish' event emitted when the response has been sent
  res.on('finish', () => {
    const duration = Date.now() - start;             // calculate elapsed time
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });

  next(); // proceed to the next middleware
};

module.exports = loggerMiddleware;
