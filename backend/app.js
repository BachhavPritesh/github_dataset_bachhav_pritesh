const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const env = require('./src/config/env');
const routes = require('./src/routes');
const errorMiddleware = require('./src/middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

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

app.use('/api/v1', routes);

app.use(errorMiddleware);

module.exports = app;
