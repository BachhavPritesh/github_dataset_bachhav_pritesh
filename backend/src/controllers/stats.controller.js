// stats controller — handles HTTP requests for dataset count statistics
// each function returns a single numeric count for a specific metric

const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const statsService = require('../services/stats.service');

// GET /stats/datasets/count — total non-deleted datasets
const totalCount = asyncHandler(async (req, res) => {
  const total = await statsService.getTotalCount();
  successResponse(res, 'Total count fetched', { total });
});

// GET /stats/datasets/functions — count of function-type datasets
const functionCount = asyncHandler(async (req, res) => {
  const total = await statsService.getCountByField('type', 'function');
  successResponse(res, 'Function count fetched', { total });
});

// GET /stats/datasets/classes — count of class-type datasets
const classCount = asyncHandler(async (req, res) => {
  const total = await statsService.getCountByField('type', 'class');
  successResponse(res, 'Class count fetched', { total });
});

// GET /stats/datasets/documentation — count of documentation-type datasets
const docCount = asyncHandler(async (req, res) => {
  const total = await statsService.getCountByField('type', 'documentation');
  successResponse(res, 'Documentation count fetched', { total });
});

// GET /stats/datasets/readme — count of README datasets
const readmeCount = asyncHandler(async (req, res) => {
  const total = await statsService.getCountByField('isReadme', true);
  successResponse(res, 'Readme count fetched', { total });
});

// GET /stats/datasets/repos — count of distinct repository names
const repoCount = asyncHandler(async (req, res) => {
  const total = await statsService.getDistinctCount('repo');
  successResponse(res, 'Repo count fetched', { total });
});

// GET /stats/datasets/languages — count of distinct programming languages
const languageCount = asyncHandler(async (req, res) => {
  const total = await statsService.getDistinctCount('language');
  successResponse(res, 'Language count fetched', { total });
});

// GET /stats/datasets/frameworks — count of distinct frameworks
const frameworkCount = asyncHandler(async (req, res) => {
  const total = await statsService.getDistinctCount('framework');
  successResponse(res, 'Framework count fetched', { total });
});

// GET /stats/datasets/github — count of GitHub-sourced datasets
const githubCount = asyncHandler(async (req, res) => {
  const total = await statsService.getCountByField('source', 'github_repository');
  successResponse(res, 'GitHub count fetched', { total });
});

// GET /stats/datasets/ai — count of AI-category datasets
const aiCount = asyncHandler(async (req, res) => {
  const total = await statsService.getCountByField('category', 'ai');
  successResponse(res, 'AI count fetched', { total });
});

module.exports = { totalCount, functionCount, classCount, docCount, readmeCount, repoCount, languageCount, frameworkCount, githubCount, aiCount };
