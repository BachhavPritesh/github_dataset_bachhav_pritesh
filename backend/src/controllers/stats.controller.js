const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const statsService = require('../services/stats.service');

const totalCount = asyncHandler(async (req, res) => {
  const total = await statsService.getTotalCount();
  successResponse(res, 'Total count fetched', { total });
});

const functionCount = asyncHandler(async (req, res) => {
  const total = await statsService.getCountByField('type', 'function');
  successResponse(res, 'Function count fetched', { total });
});

const classCount = asyncHandler(async (req, res) => {
  const total = await statsService.getCountByField('type', 'class');
  successResponse(res, 'Class count fetched', { total });
});

const docCount = asyncHandler(async (req, res) => {
  const total = await statsService.getCountByField('type', 'documentation');
  successResponse(res, 'Documentation count fetched', { total });
});

const readmeCount = asyncHandler(async (req, res) => {
  const total = await statsService.getCountByField('isReadme', true);
  successResponse(res, 'Readme count fetched', { total });
});

const repoCount = asyncHandler(async (req, res) => {
  const total = await statsService.getDistinctCount('repo');
  successResponse(res, 'Repo count fetched', { total });
});

const languageCount = asyncHandler(async (req, res) => {
  const total = await statsService.getDistinctCount('language');
  successResponse(res, 'Language count fetched', { total });
});

const frameworkCount = asyncHandler(async (req, res) => {
  const total = await statsService.getDistinctCount('framework');
  successResponse(res, 'Framework count fetched', { total });
});

const githubCount = asyncHandler(async (req, res) => {
  const total = await statsService.getCountByField('source', 'github_repository');
  successResponse(res, 'GitHub count fetched', { total });
});

const aiCount = asyncHandler(async (req, res) => {
  const total = await statsService.getCountByField('category', 'ai');
  successResponse(res, 'AI count fetched', { total });
});

module.exports = { totalCount, functionCount, classCount, docCount, readmeCount, repoCount, languageCount, frameworkCount, githubCount, aiCount };
