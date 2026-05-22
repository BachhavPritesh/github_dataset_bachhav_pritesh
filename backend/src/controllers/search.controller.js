const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');
const { getPaginationMeta } = require('../utils/pagination');
const datasetService = require('../services/dataset.service');

const searchDatasets = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const query = { ...req.query, search: q };
  const { data, total, page, limit } = await datasetService.getAllDatasets(query);
  successResponse(res, 'Search completed successfully', data, getPaginationMeta(total, page, limit));
});

module.exports = { searchDatasets };
