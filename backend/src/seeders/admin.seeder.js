// admin user seeder — creates a single admin account if it doesn't already exist
// run with: node src/seeders/admin.seeder.js
// or add to package.json: "seed:admin": "node src/seeders/admin.seeder.js"

const connectDB = require('../config/db');
const User = require('../models/User.model');

// ---------- Admin Credentials ----------
// IMPORTANT: Change these before deploying to production
const ADMIN_EMAIL    = 'admin@repohub.dev';
const ADMIN_PASSWORD = 'Admin@123';
const ADMIN_NAME     = 'RepoHub Admin';

const seed = async () => {
  await connectDB();

  const existing = await User.findOne({ email: ADMIN_EMAIL });

  if (existing) {
    console.log(`Admin account already exists: ${ADMIN_EMAIL}`);
    console.log(`Role: ${existing.role}`);
    process.exit(0);
  }

  const admin = new User({
    name:       ADMIN_NAME,
    email:      ADMIN_EMAIL,
    password:   ADMIN_PASSWORD,  // will be hashed by pre-save hook in User.model.js
    role:       'admin',
    isVerified: true,
  });

  await admin.save();

  console.log('✅ Admin user created successfully!');
  console.log('-----------------------------------');
  console.log(`📧 Email    : ${ADMIN_EMAIL}`);
  console.log(`🔑 Password : ${ADMIN_PASSWORD}`);
  console.log(`👤 Role     : admin`);
  console.log('-----------------------------------');
  console.log('This account can post, edit, and delete blogs.');

  process.exit(0);
};

seed().catch((err) => {
  console.error('Seeder error:', err.message);
  process.exit(1);
});
