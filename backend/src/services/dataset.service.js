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
