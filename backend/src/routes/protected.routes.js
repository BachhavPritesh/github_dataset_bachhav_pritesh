const express = require('express');
const verifyJWT = require('../middlewares/auth.middleware');
const datasetController = require('../controllers/dataset.controller');

const router = express.Router();

router.post('/datasets', verifyJWT, datasetController.createDataset);
router.patch('/datasets/:id', verifyJWT, datasetController.partialUpdate);
router.delete('/datasets/:id', verifyJWT, datasetController.deleteDataset);

module.exports = router;
