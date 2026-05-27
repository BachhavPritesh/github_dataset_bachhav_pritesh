const mongoose = require('mongoose');
const { TYPES, SOURCES, DOC_TYPES, CODE_ELEMENTS, FRAMEWORKS, LANGUAGES, CATEGORIES } = require('../constants/enums');

const datasetSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: TYPES },
  repo: { type: String, required: true },
  source: { type: String, required: true, enum: SOURCES },
  docType: { type: String, enum: DOC_TYPES },
  codeElement: { type: String, enum: CODE_ELEMENTS },
  isReadme: { type: Boolean, default: false },
  language: { type: String, enum: LANGUAGES },
  framework: { type: String, enum: FRAMEWORKS },
  task: { type: String },
  category: { type: String, enum: CATEGORIES },
  model: { type: String },
  library: { type: String },
  instruction: { type: String, required: true },
  input: { type: String, required: true },
  output: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Dataset', datasetSchema);
