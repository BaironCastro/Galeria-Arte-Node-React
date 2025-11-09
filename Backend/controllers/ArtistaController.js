// backend/controllers/ArtistaController.js

const Artista = require("../models/Artista"); // Importa el modelo

module.exports = {

  // Listar todos los artistas
  async getAllArtistas(req, res) {
    try {
      const artistas = await Artista.findAll();
      res.status(200).json(artistas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los artistas" });
    }
  },

  // Obtener un artista por ID
  async getArtistaById(req, res) {
    try {
      const { id } = req.params;
      const artista = await Artista.findByPk(id);
      if (!artista) {
        return res.status(404).json({ message: "Artista no encontrado" });
      }
      res.status(200).json(artista);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el artista" });
    }
  },

  // Crear un nuevo artista
  async createArtista(req, res) {
    try {
      const { nombre, nacionalidad, estilo } = req.body;
      const nuevoArtista = await Artista.create({ nombre, nacionalidad, estilo });
      res.status(201).json(nuevoArtista);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear el artista" });
    }
  },

  // Actualizar un artista existente
  async updateArtista(req, res) {
    try {
      const { id } = req.params;
      const { nombre, nacionalidad, estilo } = req.body;

      const artista = await Artista.findByPk(id);
      if (!artista) {
        return res.status(404).json({ message: "Artista no encontrado" });
      }

      await artista.update({ nombre, nacionalidad, estilo });
      res.status(200).json(artista);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar el artista" });
    }
  },

  // Eliminar un artista
  async deleteArtista(req, res) {
    try {
      const { id } = req.params;

      const artista = await Artista.findByPk(id);
      if (!artista) {
        return res.status(404).json({ message: "Artista no encontrado" });
      }

      await artista.destroy();
      res.status(200).json({ message: "Artista eliminado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el artista" });
    }
  }

};
