// filter controller — provides convenience endpoints for common dataset filters
// each endpoint delegates to datasetService.getByField() with a specific field/value

const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const datasetService = require('../services/dataset.service');

// GET /filter/functions — datasets where type = 'function'
const filterFunctions = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('type', 'function');
  successResponse(res, 'Functions fetched successfully', data);
});

// GET /filter/classes — datasets where type = 'class'
const filterClasses = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('type', 'class');
  successResponse(res, 'Classes fetched successfully', data);
});

// GET /filter/documentation — datasets where type = 'documentation'
const filterDocumentation = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('type', 'documentation');
  successResponse(res, 'Documentation fetched successfully', data);
});

// GET /filter/readme — datasets where isReadme = true
const filterReadme = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('isReadme', true);
  successResponse(res, 'Readmes fetched successfully', data);
});

// GET /filter/python — datasets where language = 'python'
const filterPython = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('language', 'python');
  successResponse(res, 'Python datasets fetched successfully', data);
});

// GET /filter/ai — datasets where category = 'ai'
const filterAI = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('category', 'ai');
  successResponse(res, 'AI datasets fetched successfully', data);
});

// GET /filter/ml — datasets where category = 'ml'
const filterML = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('category', 'ml');
  successResponse(res, 'ML datasets fetched successfully', data);
});

// GET /filter/github — datasets where source = 'github_repository'
const filterGithub = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('source', 'github_repository');
  successResponse(res, 'GitHub datasets fetched successfully', data);
});

// GET /filter/frameworks — datasets by optional framework query param, or all with a framework set
const filterFrameworks = asyncHandler(async (req, res) => {
  const { framework } = req.query;
  const filter = framework ? { framework } : { framework: { $exists: true, $ne: null } };
  const data = await datasetService.getAllDatasets({ ...req.query, ...filter });
  successResponse(res, 'Framework datasets fetched successfully', data.data);
});

// GET /filter/docstrings — datasets where type = 'docstring_generation'
const filterDocstrings = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('type', 'docstring_generation');
  successResponse(res, 'Docstring datasets fetched successfully', data);
});

module.exports = { filterFunctions, filterClasses, filterDocumentation, filterReadme, filterPython, filterAI, filterML, filterGithub, filterFrameworks, filterDocstrings };
