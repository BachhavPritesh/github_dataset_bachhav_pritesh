// protected routes — authenticated-only dataset operations (alternative paths)

const express = require('express');
const verifyJWT = require('../middlewares/auth.middleware');
const datasetController = require('../controllers/dataset.controller');

const router = express.Router();

router.post('/datasets', verifyJWT, datasetController.createDataset);       // POST /protected/datasets
router.patch('/datasets/:id', verifyJWT, datasetController.partialUpdate);  // PATCH /protected/datasets/:id
router.delete('/datasets/:id', verifyJWT, datasetController.deleteDataset);  // DELETE /protected/datasets/:id

module.exports = router;
