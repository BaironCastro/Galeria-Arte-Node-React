// backend/controllers/ObraController.js

const Obra = require("../models/Obra");
const Artista = require("../models/Artista");

module.exports = {

  // Listar todas las obras, incluyendo el artista
  async getAllObras(req, res) {
    try {
      const obras = await Obra.findAll({
        include: { model: Artista, attributes: ["id", "nombre", "nacionalidad", "estilo"] }
      });
      res.status(200).json(obras);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener las obras" });
    }
  },

  // Obtener una obra por ID
  async getObraById(req, res) {
    try {
      const { id } = req.params;
      const obra = await Obra.findByPk(id, {
        include: { model: Artista, attributes: ["id", "nombre", "nacionalidad", "estilo"] }
      });
      if (!obra) return res.status(404).json({ message: "Obra no encontrada" });
      res.status(200).json(obra);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener la obra" });
    }
  },

  // Crear una nueva obra
  async createObra(req, res) {
    try {
      const { titulo, anio, tecnica, id_artista } = req.body;

      // Verificar que el artista exista
      const artista = await Artista.findByPk(id_artista);
      if (!artista) return res.status(404).json({ message: "Artista no encontrado" });

      const nuevaObra = await Obra.create({ titulo, anio, tecnica, id_artista });
      res.status(201).json(nuevaObra);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear la obra" });
    }
  },

  // Actualizar una obra existente
  async updateObra(req, res) {
    try {
      const { id } = req.params;
      const { titulo, anio, tecnica, id_artista } = req.body;

      const obra = await Obra.findByPk(id);
      if (!obra) return res.status(404).json({ message: "Obra no encontrada" });

      if (id_artista) {
        const artista = await Artista.findByPk(id_artista);
        if (!artista) return res.status(404).json({ message: "Artista no encontrado" });
      }

      await obra.update({ titulo, anio, tecnica, id_artista });
      res.status(200).json(obra);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar la obra" });
    }
  },

  // Eliminar una obra
  async deleteObra(req, res) {
    try {
      const { id } = req.params;
      const obra = await Obra.findByPk(id);
      if (!obra) return res.status(404).json({ message: "Obra no encontrada" });

      await obra.destroy();
      res.status(200).json({ message: "Obra eliminada correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar la obra" });
    }
  }

};
