const Dataset = require('../models/Dataset.model');
const { buildFilter } = require('../utils/filterBuilder');
const { getPagination } = require('../utils/pagination');

const getAllDatasets = async (query) => {
  const filter = buildFilter(query);
  const { page, limit, skip } = getPagination(query);
  const sort = {};
  if (query.sort) {
    if (query.sort.startsWith('-')) {
      sort[query.sort.slice(1)] = -1;
    } else {
      sort[query.sort] = 1;
    }
  } else {
    sort.createdAt = -1;
  }
  const [data, total] = await Promise.all([
    Dataset.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Dataset.countDocuments(filter),
  ]);
  return { data, total, page, limit };
};

const getDatasetById = async (id) => {
  const dataset = await Dataset.findOne({ _id: id, isDeleted: false }).lean();
  if (!dataset) {
    const err = new Error('No dataset exists with the given ID');
    err.statusCode = 404;
    throw err;
  }
  return dataset;
};

const createDataset = async (body) => Dataset.create(body);

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

const bulkCreate = async (arr) => Dataset.insertMany(arr, { ordered: false });

const bulkUpdate = async (filter, data) => {
  const result = await Dataset.updateMany(filter, data);
  return result;
};

const bulkDelete = async (ids) => {
  const result = await Dataset.updateMany(
    { _id: { $in: ids }, isDeleted: false },
    { isDeleted: true }
  );
  return result;
};

const checkExists = async (id) => {
  const exists = await Dataset.exists({ _id: id, isDeleted: false });
  return !!exists;
};

const getByField = async (field, value) => {
  const filter = { isDeleted: false };
  filter[field] = value;
  return Dataset.find(filter).lean();
};

const getRecent = async () => Dataset.find({ isDeleted: false }).sort({ createdAt: -1 }).limit(20).lean();

const getRandom = async () => {
  const [result] = await Dataset.aggregate([
    { $match: { isDeleted: false } },
    { $sample: { size: 1 } },
  ]);
  return result || null;
};

const getTrending = async () => {
  return Dataset.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: '$repo', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
    { $project: { _id: 0, repo: '$_id', count: 1 } },
  ]);
};

module.exports = {
  getAllDatasets, getDatasetById, createDataset, updateDataset, deleteDataset,
  bulkCreate, bulkUpdate, bulkDelete, checkExists, getByField, getRecent, getRandom, getTrending,
};
