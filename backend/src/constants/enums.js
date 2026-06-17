// enumeration constants for dataset schema fields
// these define the allowed values for various dataset properties

// dataset types — describes what kind of code element the dataset represents
const TYPES = ['function', 'class', 'documentation', 'function_implementation', 'class_implementation', 'docstring_generation'];

// source platforms where datasets originate
const SOURCES = ['github_repository'];

// documentation file formats supported
const DOC_TYPES = ['md', 'rst', 'txt'];

// types of code elements that can be extracted
const CODE_ELEMENTS = ['function', 'class', 'module'];

// supported software frameworks and libraries
const FRAMEWORKS = ['pytorch', 'tensorflow', 'django', 'flask', 'transformers', 'spacy', 'numpy', 'pandas', 'scikit-learn', 'opencv'];

// programming languages covered by the dataset
const LANGUAGES = ['python', 'javascript', 'typescript', 'java', 'go', 'rust', 'cpp', 'csharp', 'ruby', 'php'];

// categories for classifying datasets by domain
const CATEGORIES = ['ai', 'ml', 'github', 'documentation', 'nlp', 'computer_vision', 'audio', 'reinforcement_learning', 'data_pipeline'];

// user roles for access control
const ROLES = ['user', 'admin'];

module.exports = { TYPES, SOURCES, DOC_TYPES, CODE_ELEMENTS, FRAMEWORKS, LANGUAGES, CATEGORIES, ROLES };
