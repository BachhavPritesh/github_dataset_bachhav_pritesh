const Dataset = require('../models/Dataset.model');

const getTotalCount = async () => Dataset.countDocuments({ isDeleted: false });

const getCountByField = async (field, value) => {
  const filter = { isDeleted: false };
  filter[field] = value;
  return Dataset.countDocuments(filter);
};

const getDistinctCount = async (field) => {
  const distinct = await Dataset.distinct(field, { isDeleted: false });
  return distinct.length;
};

module.exports = { getTotalCount, getCountByField, getDistinctCount };
