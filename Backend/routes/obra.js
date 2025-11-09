const express = require('express');
const router = express.Router();
const ObraController = require('../controllers/ObraController');


router.get('/', ObraController.getAllObras);
router.get('/:id', ObraController.getObraById);
router.post('/', ObraController.createObra);
router.put('/:id', ObraController.updateObra);
router.delete('/:id', ObraController.deleteObra);

module.exports = router;
