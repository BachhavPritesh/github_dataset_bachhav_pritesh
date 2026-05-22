const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const datasetService = require('../services/dataset.service');

const filterFunctions = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('type', 'function');
  successResponse(res, 'Functions fetched successfully', data);
});

const filterClasses = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('type', 'class');
  successResponse(res, 'Classes fetched successfully', data);
});

const filterDocumentation = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('type', 'documentation');
  successResponse(res, 'Documentation fetched successfully', data);
});

const filterReadme = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('isReadme', true);
  successResponse(res, 'Readmes fetched successfully', data);
});

const filterPython = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('language', 'python');
  successResponse(res, 'Python datasets fetched successfully', data);
});

const filterAI = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('category', 'ai');
  successResponse(res, 'AI datasets fetched successfully', data);
});

const filterML = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('category', 'ml');
  successResponse(res, 'ML datasets fetched successfully', data);
});

const filterGithub = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('source', 'github_repository');
  successResponse(res, 'GitHub datasets fetched successfully', data);
});

const filterFrameworks = asyncHandler(async (req, res) => {
  const { framework } = req.query;
  const filter = framework ? { framework } : { framework: { $exists: true, $ne: null } };
  const data = await datasetService.getAllDatasets({ ...req.query, ...filter });
  successResponse(res, 'Framework datasets fetched successfully', data.data);
});

const filterDocstrings = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('type', 'docstring_generation');
  successResponse(res, 'Docstring datasets fetched successfully', data);
});

module.exports = { filterFunctions, filterClasses, filterDocumentation, filterReadme, filterPython, filterAI, filterML, filterGithub, filterFrameworks, filterDocstrings };
