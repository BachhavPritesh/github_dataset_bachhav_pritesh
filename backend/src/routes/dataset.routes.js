// dataset routes — maps HTTP methods and paths to dataset controller functions
// write operations (POST, PUT, PATCH, DELETE) require JWT authentication

const express = require('express');
const datasetController = require('../controllers/dataset.controller');
const verifyJWT = require('../middlewares/auth.middleware');
const validateMiddleware = require('../middlewares/validate.middleware');
const { datasetValidationRules, datasetUpdateRules } = require('../validators/dataset.validator');

const router = express.Router();

// public read endpoints
router.get('/', datasetController.getAllDatasets);           // GET /datasets — paginated list
router.get('/random', datasetController.getRandom);           // GET /datasets/random — random dataset
router.get('/trending', datasetController.getTrending);       // GET /datasets/trending — top repos
router.get('/sort/recent', datasetController.getRecent);      // GET /datasets/sort/recent — newest
router.get('/type/:type', datasetController.getByType);       // GET /datasets/type/:type — by type
router.get('/repo/:repo', datasetController.getByRepo);       // GET /datasets/repo/:repo — by repo
router.get('/check/:id', datasetController.checkExists);      // GET /datasets/check/:id — existence check
router.get('/:id', datasetController.getDatasetById);         // GET /datasets/:id — single dataset

// authenticated write endpoints
router.post('/', verifyJWT, datasetValidationRules, validateMiddleware, datasetController.createDataset);      // POST /datasets
router.put('/:id', verifyJWT, datasetUpdateRules, validateMiddleware, datasetController.updateDataset);        // PUT /datasets/:id
router.patch('/:id', verifyJWT, datasetController.partialUpdate);                                              // PATCH /datasets/:id
router.delete('/:id', verifyJWT, datasetController.deleteDataset);                                              // DELETE /datasets/:id
router.post('/bulk-create', verifyJWT, datasetController.bulkCreate);                                           // POST /datasets/bulk-create
router.patch('/bulk-update', verifyJWT, datasetController.bulkUpdate);                                          // PATCH /datasets/bulk-update
router.delete('/bulk-delete', verifyJWT, datasetController.bulkDelete);                                         // DELETE /datasets/bulk-delete

module.exports = router;
