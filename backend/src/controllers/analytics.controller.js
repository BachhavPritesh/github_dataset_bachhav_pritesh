const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const analyticsService = require('../services/analytics.service');

const typeAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.typeAnalysis();
  successResponse(res, 'Type analysis completed', data);
});

const repoAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.repoAnalysis();
  successResponse(res, 'Repo analysis completed', data);
});

const sourceAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.sourceAnalysis();
  successResponse(res, 'Source analysis completed', data);
});

const frameworkAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.frameworkAnalysis();
  successResponse(res, 'Framework analysis completed', data);
});

const languageAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.languageAnalysis();
  successResponse(res, 'Language analysis completed', data);
});

const codeAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.codeAnalysis();
  successResponse(res, 'Code element analysis completed', data);
});

const docAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.docAnalysis();
  successResponse(res, 'Documentation analysis completed', data);
});

const readmeAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.readmeAnalysis();
  successResponse(res, 'Readme analysis completed', data);
});

const mlAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.mlAnalysis();
  successResponse(res, 'ML analysis completed', data);
});

const aiAnalysis = asyncHandler(async (req, res) => {
  const data = await analyticsService.aiAnalysis();
  successResponse(res, 'AI analysis completed', data);
});

module.exports = { typeAnalysis, repoAnalysis, sourceAnalysis, frameworkAnalysis, languageAnalysis, codeAnalysis, docAnalysis, readmeAnalysis, mlAnalysis, aiAnalysis };
