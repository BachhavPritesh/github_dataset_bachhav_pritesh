const app = require('./app');
const connectDB = require('./src/config/db');
const env = require('./src/config/env');

const start = async () => {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

start();
