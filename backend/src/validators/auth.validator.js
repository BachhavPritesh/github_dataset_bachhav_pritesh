// authentication request validation rules
// defines express-validator rules for registration and login endpoints

const { body } = require('express-validator');

// validation rules for user registration — all fields are required
const registerRules = [
  body('name').notEmpty().withMessage('name is required').trim(),
  body('email').isEmail().withMessage('valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
];

// validation rules for login — email must be valid, password must be present
const loginRules = [
  body('email').isEmail().withMessage('valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('password is required'),
];

module.exports = { registerRules, loginRules };
