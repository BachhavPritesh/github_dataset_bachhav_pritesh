// builds a MongoDB filter object from URL query parameters
// maps query string keys to schema field names and constructs the filter

const buildFilter = (query) => {
  // always exclude soft-deleted documents
  const filter = { isDeleted: false };

  // maps URL query parameter names to MongoDB schema field names
  const fieldMap = {
    type: 'type',
    repo: 'repo',
    source: 'source',
    docType: 'docType',
    codeElement: 'codeElement',
    isReadme: 'isReadme',
    language: 'language',
    framework: 'framework',
    task: 'task',
    category: 'category',
    model: 'model',
    library: 'library',
  };

  // iterate over the mapping and add non-undefined query params to the filter
  for (const [param, field] of Object.entries(fieldMap)) {
    if (query[param] !== undefined) {
      // isReadme comes as a string from query params, convert to boolean
      if (param === 'isReadme') {
        filter[field] = query[param] === 'true';
      } else if (typeof query[param] === 'string' && query[param].includes(',')) {
        // comma-separated values → match any in the list
        filter[field] = { $in: query[param].split(',').map(v => v.trim()) };
      } else {
        filter[field] = query[param];
      }
    }
  }

  // if a search term is provided, build a case-insensitive regex across multiple fields
  if (query.search) {
    const regex = { $regex: query.search, $options: 'i' };
    filter.$or = [
      { type: regex },
      { repo: regex },
      { instruction: regex },
      { input: regex },
      { output: regex },
    ];
  }

  return filter;
};

module.exports = { buildFilter };
