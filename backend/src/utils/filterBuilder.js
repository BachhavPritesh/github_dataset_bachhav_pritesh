const buildFilter = (query) => {
  const filter = { isDeleted: false };
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
  for (const [param, field] of Object.entries(fieldMap)) {
    if (query[param] !== undefined) {
      if (param === 'isReadme') {
        filter[field] = query[param] === 'true';
      } else {
        filter[field] = query[param];
      }
    }
  }
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
