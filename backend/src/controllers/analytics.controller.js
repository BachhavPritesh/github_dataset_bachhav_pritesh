// analytics controller — handles HTTP requests for analytics aggregation endpoints
// each function delegates to the analytics service and returns the aggregated data

const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const analyticsService = require('../services/analytics.service');

// GET /analytics/datasets/type-analysis — count by dataset type
const typeAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.typeAnalysis();
  successResponse(res, 'Type analysis completed', data);
});

// GET /analytics/datasets/repo-analysis — count by repository (top 20)
const repoAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.repoAnalysis();
  successResponse(res, 'Repo analysis completed', data);
});

// GET /analytics/datasets/source-analysis — count by source
const sourceAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.sourceAnalysis();
  successResponse(res, 'Source analysis completed', data);
});

// GET /analytics/datasets/framework-analysis — count by framework (non-null only)
const frameworkAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.frameworkAnalysis();
  successResponse(res, 'Framework analysis completed', data);
});

// GET /analytics/datasets/language-analysis — count by language (non-null only)
const languageAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.languageAnalysis();
  successResponse(res, 'Language analysis completed', data);
});

// GET /analytics/datasets/code-analysis — count by code element type
const codeAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.codeAnalysis();
  successResponse(res, 'Code element analysis completed', data);
});

// GET /analytics/datasets/doc-analysis — count by documentation type
const docAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.docAnalysis();
  successResponse(res, 'Documentation analysis completed', data);
});

// GET /analytics/datasets/readme-analysis — count readmes by repository
const readmeAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.readmeAnalysis();
  successResponse(res, 'Readme analysis completed', data);
});

// GET /analytics/datasets/ml-analysis — count ML datasets by framework
const mlAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.mlAnalysis();
  successResponse(res, 'ML analysis completed', data);
});

// GET /analytics/datasets/ai-analysis — count AI datasets by task
const aiAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.aiAnalysis();
  successResponse(res, 'AI analysis completed', data);
});

module.exports = { typeAnalysis, repoAnalysis, sourceAnalysis, frameworkAnalysis, languageAnalysis, codeAnalysis, docAnalysis, readmeAnalysis, mlAnalysis, aiAnalysis };
