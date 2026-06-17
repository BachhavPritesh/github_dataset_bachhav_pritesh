// environment configuration
// loads environment variables from .env file and exports them as a config object
// provides fallback defaults for local development

const dotenv = require('dotenv');
const path = require('path');

// load .env from the project root directory
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const env = {
  PORT: parseInt(process.env.PORT, 10) || 5000,          // server port, default 5000
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/dataset_db', // MongoDB connection string
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_key', // secret key for signing JWTs
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',    // token expiration duration
  NODE_ENV: process.env.NODE_ENV || 'development',       // current environment (development/production)
};

module.exports = env;
