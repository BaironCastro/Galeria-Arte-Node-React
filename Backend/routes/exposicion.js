const express = require('express');
const router = express.Router();
const ExposicionController = require('../controllers/ExposicionController');


router.get('/', ExposicionController.getAllExposiciones);
router.get('/:id', ExposicionController.getExposicionById);
router.post('/', ExposicionController.createExposicion);
router.put('/:id', ExposicionController.updateExposicion);
router.delete('/:id', ExposicionController.deleteExposicion);

module.exports = router;
