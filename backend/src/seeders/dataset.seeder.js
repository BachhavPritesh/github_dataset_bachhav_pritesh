// dataset seeder — reads a JSON file of GitHub dataset entries, transforms them, and inserts into MongoDB
// run with: node src/seeders/dataset.seeder.js or npm run seed

const path = require('path');
const fs = require('fs');
const connectDB = require('../config/db');
const Dataset = require('../models/Dataset.model');

const seed = async () => {
  await connectDB();

  // try two possible locations for the source JSON file
  let filePath = path.join(__dirname, '..', '..', '..', 'GITHUB dataset.json');
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, '..', '..', 'data', 'dataset.json');
  }

  console.log(`Reading dataset from: ${filePath}`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const entries = JSON.parse(raw);

  // ---------- Heuristic Detection Functions ----------

  // detects programming language from file extension or repository name
  const detectLanguage = (filePath, repo) => {
    if (!filePath) return 'python';
    // map file extensions to language names
    const extMap = {
      '.py': 'python', '.js': 'javascript', '.ts': 'typescript',
      '.java': 'java', '.go': 'go', '.rs': 'rust', '.cpp': 'cpp',
      '.cs': 'csharp', '.rb': 'ruby', '.php': 'php',
    };
    const ext = Object.keys(extMap).find((e) => filePath.endsWith(e));
    if (ext) return extMap[ext];
    // fallback: infer language from keywords in the repository name
    const repoName = (repo || '').toLowerCase();
    if (/\bpython|pytorch|django|yolov|transformers|spacy|numpy|pandas|scikit|tensorflow\b/.test(repoName)) return 'python';
    if (/\bjavascript|node|react|vue|angular\b/.test(repoName)) return 'javascript';
    if (/\btypescript\b/.test(repoName)) return 'typescript';
    if (/\bjava\b/.test(repoName)) return 'java';
    if (/\brust\b/.test(repoName)) return 'rust';
    if (/\bgo\b/.test(repoName)) return 'go';
    return 'python';
  };

  // detects framework from keywords in the repository name
  const detectFramework = (repo, type) => {
    const repoName = (repo || '').toLowerCase();
    if (/\bpytorch|torch\b/.test(repoName)) return 'pytorch';
    if (/\btensorflow|tf\b/.test(repoName)) return 'tensorflow';
    if (/\bdjango\b/.test(repoName)) return 'django';
    if (/\bflask\b/.test(repoName)) return 'flask';
    if (/\btransformers|huggingface\b/.test(repoName)) return 'transformers';
    if (/\bspacy\b/.test(repoName)) return 'spacy';
    if (/\bnumpy\b/.test(repoName)) return 'numpy';
    if (/\bpandas\b/.test(repoName)) return 'pandas';
    if (/\bscikit-learn|sklearn\b/.test(repoName)) return 'scikit-learn';
    if (/\bopencv|cv2\b/.test(repoName)) return 'opencv';
    return null;
  };

  // detects category from type field and repository name keywords
  const detectCategory = (type, repo) => {
    const typeStr = (type || '').toLowerCase();
    const repoName = (repo || '').toLowerCase();
    if (typeStr.includes('docstring') || typeStr.includes('documentation')) return 'documentation';
    if (/\bai|llm|gpt\b/.test(repoName)) return 'ai';
    if (/\bml|machine.learning|pytorch|tensorflow|yolov|transformers|spacy|numpy|pandas|scikit\b/.test(repoName)) return 'ml';
    if (/\bnlp|bert|gpt|llm|language.model\b/.test(repoName)) return 'nlp';
    return 'github';
  };

  // transform raw JSON entries into the Dataset schema format
  const transformed = entries.map((entry) => {
    const repo = entry.metadata?.repo_name || 'unknown';
    const filePath = entry.metadata?.file_path || '';
    const type = entry.metadata?.type || 'function';
    return {
      type,
      repo,
      source: entry.metadata?.source_type || 'github_repository',
      docType: entry.metadata?.doc_type || null,
      codeElement: entry.metadata?.code_element || null,
      isReadme: entry.metadata?.is_readme || false,
      language: detectLanguage(filePath, repo),      // heuristic: file extension → language
      framework: detectFramework(repo, type),          // heuristic: repo keywords → framework
      category: detectCategory(type, repo),            // heuristic: type/repo → category
      instruction: entry.instruction || '',
      input: entry.input || '',
      output: entry.output || '',
    };
  });

  // clear existing data and insert the transformed entries
  await Dataset.deleteMany({});
  try {
    const inserted = await Dataset.insertMany(transformed, { ordered: false });
    console.log(`Seeded ${inserted.length} entries`);
  } catch (err) {
    // ordered: false means some may have been inserted before the first duplicate error
    const count = err.result?.insertedCount || 0;
    console.log(`Seeded ${count} entries (${transformed.length - count} duplicates skipped)`);
  }

  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
