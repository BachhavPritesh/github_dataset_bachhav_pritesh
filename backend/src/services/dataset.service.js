// dataset service — business logic layer for dataset CRUD and query operations
// controllers delegate to this layer; it handles data access and error handling

const Dataset = require('../models/Dataset.model');
const { buildFilter } = require('../utils/filterBuilder');
const { getPagination } = require('../utils/pagination');

// fetches paginated, filtered, and sorted datasets
const getAllDatasets = async (query) => {
  const filter = buildFilter(query);            // convert query params to MongoDB filter
  const { page, limit, skip } = getPagination(query); // extract pagination values

  // build sort object: prefix with '-' for descending order
  const sort = {};
  if (query.sort) {
    if (query.sort.startsWith('-')) {
      sort[query.sort.slice(1)] = -1;  // sort field descending
    } else {
      sort[query.sort] = 1;            // sort field ascending
    }
  } else {
    sort.createdAt = -1; // default: newest first
  }

  // run query and count in parallel for performance
  const [data, total] = await Promise.all([
    Dataset.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Dataset.countDocuments(filter),
  ]);
  return { data, total, page, limit };
};

// fetches a single non-deleted dataset by ID
// throws a 404 error if not found
const getDatasetById = async (id) => {
  const dataset = await Dataset.findOne({ _id: id, isDeleted: false }).lean();
  if (!dataset) {
    const err = new Error('No dataset exists with the given ID');
    err.statusCode = 404;
    throw err;
  }
  return dataset;
};

// creates a new dataset document
const createDataset = async (body) => Dataset.create(body);

// replaces a non-deleted dataset with new data, runs schema validators
const updateDataset = async (id, body) => {
  const dataset = await Dataset.findOneAndUpdate(
    { _id: id, isDeleted: false },
    body,
    { new: true, runValidators: true }
  ).lean();
  if (!dataset) {
    const err = new Error('No dataset exists with the given ID');
    err.statusCode = 404;
    throw err;
  }
  return dataset;
};

// soft-deletes a dataset by setting isDeleted to true
const deleteDataset = async (id) => {
  const dataset = await Dataset.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true }
  ).lean();
  if (!dataset) {
    const err = new Error('No dataset exists with the given ID');
    err.statusCode = 404;
    throw err;
  }
  return dataset;
};

// bulk create — inserts multiple documents at once, skips duplicates
const bulkCreate = async (arr) => Dataset.insertMany(arr, { ordered: false });

// bulk update — updates all documents matching the filter with the given data
const bulkUpdate = async (filter, data) => {
  const result = await Dataset.updateMany(filter, data);
  return result;
};

// bulk soft-delete — sets isDeleted to true for all matching IDs
const bulkDelete = async (ids) => {
  const result = await Dataset.updateMany(
    { _id: { $in: ids }, isDeleted: false },
    { isDeleted: true }
  );
  return result;
};

// checks whether a non-deleted dataset with the given ID exists
const checkExists = async (id) => {
  const exists = await Dataset.exists({ _id: id, isDeleted: false });
  return !!exists;
};

// fetches all non-deleted datasets where a given field matches a value
const getByField = async (field, value) => {
  const filter = { isDeleted: false };
  filter[field] = value;
  return Dataset.find(filter).lean();
};

// returns the 20 most recently created non-deleted datasets
const getRecent = async () => Dataset.find({ isDeleted: false }).sort({ createdAt: -1 }).limit(20).lean();

// returns one random non-deleted dataset using MongoDB's $sample aggregation
const getRandom = async () => {
  const [result] = await Dataset.aggregate([
    { $match: { isDeleted: false } },   // exclude soft-deleted
    { $sample: { size: 1 } },           // pick one random document
  ]);
  return result || null;
};

// returns the top 10 repositories by dataset count (trending)
const getTrending = async () => {
  return Dataset.aggregate([
    { $match: { isDeleted: false } },          // exclude soft-deleted
    { $group: { _id: '$repo', count: { $sum: 1 } } }, // group by repo and count
    { $sort: { count: -1 } },                   // highest count first
    { $limit: 10 },                              // top 10
    { $project: { _id: 0, repo: '$_id', count: 1 } }, // shape the output
  ]);
};

module.exports = {
  getAllDatasets, getDatasetById, createDataset, updateDataset, deleteDataset,
  bulkCreate, bulkUpdate, bulkDelete, checkExists, getByField, getRecent, getRandom, getTrending,
};
