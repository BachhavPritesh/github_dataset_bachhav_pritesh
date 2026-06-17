// pagination utility for parsing query parameters and generating metadata

// extracts and validates page/limit from query string, computes skip offset
const getPagination = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);          // page must be at least 1
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 10)); // limit between 1 and 100
  const skip = (page - 1) * limit; // number of documents to skip for this page
  return { page, limit, skip };
};

// generates pagination metadata to include in API responses
const getPaginationMeta = (total, page, limit) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit) || 1,  // total pages, minimum 1 even if no results
});

module.exports = { getPagination, getPaginationMeta };
