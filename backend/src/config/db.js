// database connection configuration
// connects to MongoDB using mongoose, configured via environment variables

const dns = require('dns');
const mongoose = require('mongoose');
const env = require('./env');

// use Google and Cloudflare DNS servers for reliable hostname resolution
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
  try {
    // attempt to connect to MongoDB with the URI from config
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);       
  } catch (err) {
    // log the error and exit the process so the server doesn't run without a database
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
