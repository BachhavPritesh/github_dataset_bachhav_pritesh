const { body } = require('express-validator');

const registerRules = [
  body('name').notEmpty().withMessage('name is required').trim(),
  body('email').isEmail().withMessage('valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
];

const loginRules = [
  body('email').isEmail().withMessage('valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('password is required'),
];

module.exports = { registerRules, loginRules };
