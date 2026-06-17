// search controller — handles text search across dataset fields

const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const { getPaginationMeta } = require('../utils/pagination');
const datasetService = require('../services/dataset.service');

// GET /search/datasets?q= — full-text search across type, repo, instruction, input, output
// the 'q' query parameter is mapped to the 'search' field used by filterBuilder
const searchDatasets = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const query = { ...req.query, search: q };
  const { data, total, page, limit } = await datasetService.getAllDatasets(query);
  successResponse(res, 'Search completed successfully', data, getPaginationMeta(total, page, limit));
});

module.exports = { searchDatasets };
