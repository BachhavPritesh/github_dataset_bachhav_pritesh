const { body } = require('express-validator');

const datasetValidationRules = [
  body('type').notEmpty().withMessage('type is required').isString(),
  body('repo').notEmpty().withMessage('repo is required').isString(),
  body('source').notEmpty().withMessage('source is required').isString(),
  body('instruction').notEmpty().withMessage('instruction is required').isString(),
  body('input').notEmpty().withMessage('input is required').isString(),
  body('output').notEmpty().withMessage('output is required').isString(),
];

const datasetUpdateRules = [
  body('type').optional().isString(),
  body('repo').optional().isString(),
  body('source').optional().isString(),
  body('instruction').optional().isString(),
  body('input').optional().isString(),
  body('output').optional().isString(),
];

module.exports = { datasetValidationRules, datasetUpdateRules };
