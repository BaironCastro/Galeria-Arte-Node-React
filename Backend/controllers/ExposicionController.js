// backend/controllers/ExposicionController.js

const Exposicion = require("../models/Exposicion");

module.exports = {

  // Listar todas las exposiciones
  async getAllExposiciones(req, res) {
    try {
      const exposiciones = await Exposicion.findAll();
      res.status(200).json(exposiciones);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener las exposiciones" });
    }
  },

  // Obtener una exposición por ID
  async getExposicionById(req, res) {
    try {
      const { id } = req.params;
      const exposicion = await Exposicion.findByPk(id);
      if (!exposicion) return res.status(404).json({ message: "Exposición no encontrada" });
      res.status(200).json(exposicion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener la exposición" });
    }
  },

  // Crear una nueva exposición
  async createExposicion(req, res) {
    try {
      const { nombre, lugar, fecha_inicio, fecha_fin } = req.body;
      const nuevaExposicion = await Exposicion.create({ nombre, lugar, fecha_inicio, fecha_fin });
      res.status(201).json(nuevaExposicion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear la exposición" });
    }
  },

  // Actualizar una exposición existente
  async updateExposicion(req, res) {
    try {
      const { id } = req.params;
      const { nombre, lugar, fecha_inicio, fecha_fin } = req.body;

      const exposicion = await Exposicion.findByPk(id);
      if (!exposicion) return res.status(404).json({ message: "Exposición no encontrada" });

      await exposicion.update({ nombre, lugar, fecha_inicio, fecha_fin });
      res.status(200).json(exposicion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar la exposición" });
    }
  },

  // Eliminar una exposición
  async deleteExposicion(req, res) {
    try {
      const { id } = req.params;
      const exposicion = await Exposicion.findByPk(id);
      if (!exposicion) return res.status(404).json({ message: "Exposición no encontrada" });

      await exposicion.destroy();
      res.status(200).json({ message: "Exposición eliminada correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar la exposición" });
    }
  }

};
