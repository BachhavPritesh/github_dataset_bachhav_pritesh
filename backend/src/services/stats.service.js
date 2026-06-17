// statistics service — provides simple count-based queries for dashboard KPIs

const Dataset = require('../models/Dataset.model');

// returns total count of non-deleted datasets
const getTotalCount = async () => Dataset.countDocuments({ isDeleted: false });

// returns count of non-deleted datasets where a specific field equals a value
const getCountByField = async (field, value) => {
  const filter = { isDeleted: false };
  filter[field] = value;
  return Dataset.countDocuments(filter);
};

// returns the count of distinct values for a given field across non-deleted datasets
const getDistinctCount = async (field) => {
  const distinct = await Dataset.distinct(field, { isDeleted: false });
  return distinct.length;
};

module.exports = { getTotalCount, getCountByField, getDistinctCount };
