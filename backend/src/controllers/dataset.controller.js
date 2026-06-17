// dataset controller — handles HTTP requests for dataset CRUD and query operations
// each function parses the request, delegates to the service layer, and formats the response

const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { getPaginationMeta } = require('../utils/pagination');
const datasetService = require('../services/dataset.service');

// GET /datasets — fetch paginated, filtered, sorted datasets
const getAllDatasets = asyncHandler(async (req, res) => {
  const { data, total, page, limit } = await datasetService.getAllDatasets(req.query);
  successResponse(res, 'Datasets fetched successfully', data, getPaginationMeta(total, page, limit));
});

// GET /datasets/:id — fetch a single dataset by its ID
const getDatasetById = asyncHandler(async (req, res) => {
  const data = await datasetService.getDatasetById(req.params.id);
  successResponse(res, 'Dataset fetched successfully', data);
});

// POST /datasets — create a new dataset (requires auth)
const createDataset = asyncHandler(async (req, res) => {
  const data = await datasetService.createDataset(req.body);
  successResponse(res, 'Dataset created successfully', data, null, 201);
});

// PUT /datasets/:id — fully replace a dataset (requires auth)
const updateDataset = asyncHandler(async (req, res) => {
  const data = await datasetService.updateDataset(req.params.id, req.body);
  successResponse(res, 'Dataset updated successfully', data);
});

// PATCH /datasets/:id — partially update a dataset (reuses updateDataset logic)
const partialUpdate = asyncHandler(async (req, res) => {
  const data = await datasetService.updateDataset(req.params.id, req.body);
  successResponse(res, 'Dataset updated successfully', data);
});

// DELETE /datasets/:id — soft-delete a dataset (requires auth)
const deleteDataset = asyncHandler(async (req, res) => {
  const data = await datasetService.deleteDataset(req.params.id);
  successResponse(res, 'Dataset deleted successfully', data);
});

// POST /datasets/bulk-create — insert multiple datasets at once
const bulkCreate = asyncHandler(async (req, res) => {
  const data = await datasetService.bulkCreate(req.body);
  successResponse(res, 'Bulk create completed', { inserted: data.length }, null, 201);
});

// PATCH /datasets/bulk-update — update many datasets matching a filter
const bulkUpdate = asyncHandler(async (req, res) => {
  const { filter, data } = req.body;
  const result = await datasetService.bulkUpdate(filter, data);
  successResponse(res, 'Bulk update completed', { modified: result.modifiedCount });
});

// DELETE /datasets/bulk-delete — soft-delete multiple datasets by IDs
const bulkDelete = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  const result = await datasetService.bulkDelete(ids);
  successResponse(res, 'Bulk delete completed', { modified: result.modifiedCount });
});

// GET /datasets/check/:id — check if a dataset with the given ID exists
const checkExists = asyncHandler(async (req, res) => {
  const exists = await datasetService.checkExists(req.params.id);
  successResponse(res, 'Existence check completed', { exists });
});

// GET /datasets/type/:type — fetch datasets by type (function, class, etc.)
const getByType = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('type', req.params.type);
  successResponse(res, 'Datasets fetched by type', data);
});

// GET /datasets/repo/:repo — fetch datasets by repository name
const getByRepo = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('repo', req.params.repo);
  successResponse(res, 'Datasets fetched by repo', data);
});

// GET /datasets/source/:source — fetch datasets by source (not currently routed)
const getBySource = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('source', req.params.source);
  successResponse(res, 'Datasets fetched by source', data);
});

// GET /datasets/sort/recent — fetch the 20 most recent datasets
const getRecent = asyncHandler(async (req, res) => {
  const data = await datasetService.getRecent();
  successResponse(res, 'Recent datasets fetched', data);
});

// GET /datasets/random — fetch one random dataset
const getRandom = asyncHandler(async (req, res) => {
  const data = await datasetService.getRandom();
  successResponse(res, 'Random dataset fetched', data);
});

// GET /datasets/trending — fetch top 10 repositories by dataset count
const getTrending = asyncHandler(async (req, res) => {
  const data = await datasetService.getTrending();
  successResponse(res, 'Trending repos fetched', data);
});

module.exports = {
  getAllDatasets, getDatasetById, createDataset, updateDataset, partialUpdate, deleteDataset,
  bulkCreate, bulkUpdate, bulkDelete, checkExists, getByType, getByRepo, getBySource,
  getRecent, getRandom, getTrending,
};
