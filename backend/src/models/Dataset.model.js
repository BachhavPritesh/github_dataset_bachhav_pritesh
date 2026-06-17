// Dataset model — represents a single code/documentation entry extracted from a GitHub repository
// each document stores the instruction-input-output triplet plus metadata about the source

const mongoose = require('mongoose');
const { TYPES, SOURCES, DOC_TYPES, CODE_ELEMENTS, FRAMEWORKS, LANGUAGES, CATEGORIES } = require('../constants/enums');

// ---------- Schema Definition ----------
const datasetSchema = new mongoose.Schema({
  type:        { type: String, required: true, enum: TYPES },           // what kind of code element (function, class, etc.)
  repo:        { type: String, required: true },                        // source repository name
  source:      { type: String, required: true, enum: SOURCES },         // where the data came from
  docType:     { type: String, enum: DOC_TYPES },                       // documentation format if type is documentation
  codeElement: { type: String, enum: CODE_ELEMENTS },                   // specific code element extracted
  isReadme:    { type: Boolean, default: false },                       // whether this came from a README file
  language:    { type: String, enum: LANGUAGES },                       // programming language
  framework:   { type: String, enum: FRAMEWORKS },                      // framework/library used
  task:        { type: String },                                        // specific task description
  category:    { type: String, enum: CATEGORIES },                      // domain classification
  model:       { type: String },                                        // ML model name if applicable
  library:     { type: String },                                        // library name if applicable
  instruction: { type: String, required: true },                        // instruction prompt
  input:       { type: String, required: true },                        // input code/text
  output:      { type: String, required: true },                        // expected output
  isDeleted:   { type: Boolean, default: false },                       // soft-delete flag
}, { timestamps: true });                                               // auto-adds createdAt and updatedAt

// ---------- Indexes ----------
// indexes on commonly queried fields to optimize read performance
datasetSchema.index({ type: 1 });
datasetSchema.index({ repo: 1 });
datasetSchema.index({ source: 1 });
datasetSchema.index({ language: 1 });
datasetSchema.index({ framework: 1 });
datasetSchema.index({ category: 1 });
datasetSchema.index({ isDeleted: 1 }); // used by almost every query to exclude soft-deleted docs

module.exports = mongoose.model('Dataset', datasetSchema);
