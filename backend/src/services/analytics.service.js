// analytics service — aggregation pipelines that power the analytics dashboard
// each function groups datasets by a specific field and returns sorted counts

const Dataset = require('../models/Dataset.model');

// counts datasets grouped by 'type' (function, class, documentation, etc.)
const typeAnalysis = async () => Dataset.aggregate([
  { $match: { isDeleted: false } },
  { $group: { _id: '$type', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $project: { _id: 0, type: '$_id', count: 1 } },
]);

// counts datasets grouped by 'repo' (repository name), top 20
const repoAnalysis = async () => Dataset.aggregate([
  { $match: { isDeleted: false } },
  { $group: { _id: '$repo', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 20 },
  { $project: { _id: 0, repo: '$_id', count: 1 } },
]);

// counts datasets grouped by 'source' (github_repository, etc.)
const sourceAnalysis = async () => Dataset.aggregate([
  { $match: { isDeleted: false } },
  { $group: { _id: '$source', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $project: { _id: 0, source: '$_id', count: 1 } },
]);

// counts datasets grouped by 'framework' (only non-null frameworks)
const frameworkAnalysis = async () => Dataset.aggregate([
  { $match: { isDeleted: false, framework: { $exists: true, $ne: null } } },
  { $group: { _id: '$framework', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $project: { _id: 0, framework: '$_id', count: 1 } },
]);

// counts datasets grouped by 'language' (only non-null languages)
const languageAnalysis = async () => Dataset.aggregate([
  { $match: { isDeleted: false, language: { $exists: true, $ne: null } } },
  { $group: { _id: '$language', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $project: { _id: 0, language: '$_id', count: 1 } },
]);

// counts datasets grouped by 'codeElement' (function, class, module)
const codeAnalysis = async () => Dataset.aggregate([
  { $match: { isDeleted: false, codeElement: { $exists: true, $ne: null } } },
  { $group: { _id: '$codeElement', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $project: { _id: 0, codeElement: '$_id', count: 1 } },
]);

// counts datasets grouped by 'docType' (md, rst, txt)
const docAnalysis = async () => Dataset.aggregate([
  { $match: { isDeleted: false, docType: { $exists: true, $ne: null } } },
  { $group: { _id: '$docType', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $project: { _id: 0, docType: '$_id', count: 1 } },
]);

// counts README datasets grouped by repository
const readmeAnalysis = async () => Dataset.aggregate([
  { $match: { isDeleted: false, isReadme: true } },
  { $group: { _id: '$repo', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $project: { _id: 0, repo: '$_id', count: 1 } },
]);

// counts ML-category datasets grouped by framework
const mlAnalysis = async () => Dataset.aggregate([
  { $match: { isDeleted: false, category: 'ml' } },
  { $group: { _id: '$framework', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $project: { _id: 0, framework: '$_id', count: 1 } },
]);

// counts AI-category datasets grouped by task
const aiAnalysis = async () => Dataset.aggregate([
  { $match: { isDeleted: false, category: 'ai' } },
  { $group: { _id: '$task', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $project: { _id: 0, task: '$_id', count: 1 } },
]);

module.exports = {
  typeAnalysis, repoAnalysis, sourceAnalysis, frameworkAnalysis,
  languageAnalysis, codeAnalysis, docAnalysis, readmeAnalysis, mlAnalysis, aiAnalysis,
};
