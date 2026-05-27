const express = require('express');
const datasetController = require('../controllers/dataset.controller');
const verifyJWT = require('../middlewares/auth.middleware');
const validateMiddleware = require('../middlewares/validate.middleware');
const { datasetValidationRules, datasetUpdateRules } = require('../validators/dataset.validator');

const router = express.Router();

router.get('/', datasetController.getAllDatasets);
router.get('/random', datasetController.getRandom);
router.get('/trending', datasetController.getTrending);
router.get('/sort/recent', datasetController.getRecent);
router.get('/type/:type', datasetController.getByType);
router.get('/repo/:repo', datasetController.getByRepo);
router.get('/check/:id', datasetController.checkExists);
router.get('/:id', datasetController.getDatasetById);
router.post('/', verifyJWT, datasetValidationRules, validateMiddleware, datasetController.createDataset);
router.put('/:id', verifyJWT, datasetUpdateRules, validateMiddleware, datasetController.updateDataset);
router.patch('/:id', verifyJWT, datasetController.partialUpdate);
router.delete('/:id', verifyJWT, datasetController.deleteDataset);
router.post('/bulk-create', verifyJWT, datasetController.bulkCreate);
router.patch('/bulk-update', verifyJWT, datasetController.bulkUpdate);
router.delete('/bulk-delete', verifyJWT, datasetController.bulkDelete);

module.exports = router;
