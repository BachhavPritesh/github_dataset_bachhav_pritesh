const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { getPaginationMeta } = require('../utils/pagination');
const datasetService = require('../services/dataset.service');

const getAllDatasets = asyncHandler(async (req, res) => {
  const { data, total, page, limit } = await datasetService.getAllDatasets(req.query);
  successResponse(res, 'Datasets fetched successfully', data, getPaginationMeta(total, page, limit));
});

const getDatasetById = asyncHandler(async (req, res) => {
  const data = await datasetService.getDatasetById(req.params.id);
  successResponse(res, 'Dataset fetched successfully', data);
});

const createDataset = asyncHandler(async (req, res) => {
  const data = await datasetService.createDataset(req.body);
  successResponse(res, 'Dataset created successfully', data, null, 201);
});

const updateDataset = asyncHandler(async (req, res) => {
  const data = await datasetService.updateDataset(req.params.id, req.body);
  successResponse(res, 'Dataset updated successfully', data);
});

const partialUpdate = asyncHandler(async (req, res) => {
  const data = await datasetService.updateDataset(req.params.id, req.body);
  successResponse(res, 'Dataset updated successfully', data);
});

const deleteDataset = asyncHandler(async (req, res) => {
  const data = await datasetService.deleteDataset(req.params.id);
  successResponse(res, 'Dataset deleted successfully', data);
});

const bulkCreate = asyncHandler(async (req, res) => {
  const data = await datasetService.bulkCreate(req.body);
  successResponse(res, 'Bulk create completed', { inserted: data.length }, null, 201);
});

const bulkUpdate = asyncHandler(async (req, res) => {
  const { filter, data } = req.body;
  const result = await datasetService.bulkUpdate(filter, data);
  successResponse(res, 'Bulk update completed', { modified: result.modifiedCount });
});

const bulkDelete = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  const result = await datasetService.bulkDelete(ids);
  successResponse(res, 'Bulk delete completed', { modified: result.modifiedCount });
});

const checkExists = asyncHandler(async (req, res) => {
  const exists = await datasetService.checkExists(req.params.id);
  successResponse(res, 'Existence check completed', { exists });
});

const getByType = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('type', req.params.type);
  successResponse(res, 'Datasets fetched by type', data);
});

const getByRepo = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('repo', req.params.repo);
  successResponse(res, 'Datasets fetched by repo', data);
});

const getBySource = asyncHandler(async (req, res) => {
  const data = await datasetService.getByField('source', req.params.source);
  successResponse(res, 'Datasets fetched by source', data);
});

const getRecent = asyncHandler(async (req, res) => {
  const data = await datasetService.getRecent();
  successResponse(res, 'Recent datasets fetched', data);
});

const getRandom = asyncHandler(async (req, res) => {
  const data = await datasetService.getRandom();
  successResponse(res, 'Random dataset fetched', data);
});

const getTrending = asyncHandler(async (req, res) => {
  const data = await datasetService.getTrending();
  successResponse(res, 'Trending repos fetched', data);
});

module.exports = {
  getAllDatasets, getDatasetById, createDataset, updateDataset, partialUpdate, deleteDataset,
  bulkCreate, bulkUpdate, bulkDelete, checkExists, getByType, getByRepo, getBySource,
  getRecent, getRandom, getTrending,
};
