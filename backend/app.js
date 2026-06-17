// Express application setup — configures middleware, mounts routes, and registers error handling

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const env = require('./src/config/env');
const routes = require('./src/routes');
const errorMiddleware = require('./src/middlewares/error.middleware');

const app = express();

// ---------- Global Middleware ----------
app.use(cors());                  // enable cross-origin requests
app.use(morgan('dev'));           // HTTP request logging (dev format)
app.use(express.json());          // parse JSON request bodies

// ---------- Health Check ----------
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    data: {
      status: 'OK',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      env: env.NODE_ENV,
    },
  });
});

// ---------- API Routes ----------
app.use('/api/v1', routes);

// ---------- Global Error Handler (must be last) ----------
app.use(errorMiddleware);

module.exports = app;
