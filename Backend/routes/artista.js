const express = require('express');
const router = express.Router();
const ArtistaController = require('../controllers/ArtistaController');

router.get('/', ArtistaController.getAllArtistas);
router.get('/:id', ArtistaController.getArtistaById);
router.post('/', ArtistaController.createArtista);
router.put('/:id', ArtistaController.updateArtista);
router.delete('/:id', ArtistaController.deleteArtista);

module.exports = router;



