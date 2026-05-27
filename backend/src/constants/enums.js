const TYPES = ['function', 'class', 'documentation', 'function_implementation', 'class_implementation', 'docstring_generation'];

const SOURCES = ['github_repository'];

const DOC_TYPES = ['md', 'rst', 'txt'];

const CODE_ELEMENTS = ['function', 'class', 'module'];

const FRAMEWORKS = ['pytorch', 'tensorflow', 'django', 'flask', 'transformers', 'spacy', 'numpy', 'pandas', 'scikit-learn', 'opencv'];

const LANGUAGES = ['python', 'javascript', 'typescript', 'java', 'go', 'rust', 'cpp', 'csharp', 'ruby', 'php'];

const CATEGORIES = ['ai', 'ml', 'github', 'documentation', 'nlp', 'computer_vision', 'audio', 'reinforcement_learning', 'data_pipeline'];

const ROLES = ['user', 'admin'];

module.exports = { TYPES, SOURCES, DOC_TYPES, CODE_ELEMENTS, FRAMEWORKS, LANGUAGES, CATEGORIES, ROLES };
