const express = require('express');
const router = express.Router();
const ObraExpuestaController = require('../controllers/ObraExpuestaController');

// Listar todas las asignaciones
router.get('/', ObraExpuestaController.getAllObrasExpuestas);

// Asignar una obra a una exposición
router.post('/', ObraExpuestaController.assignObraToExposicion);

// Eliminar una asignación
router.delete('/:id', ObraExpuestaController.removeObraFromExposicion);

module.exports = router;
