// backend/controllers/ObraExpuestaController.js
const { ObraExpuesta, Obra, Exposicion, Artista } = require("../models");

module.exports = {
  async getAllObrasExpuestas(req, res) {
    try {
      const asignaciones = await ObraExpuesta.findAll({
        include: [
          {
            model: Obra,
            as: "Obra", // alias del belongsTo en ObraExpuesta
            attributes: ["id", "titulo", "anio", "tecnica"],
            include: [
              {
                model: Artista,
                as: "artista", // alias del belongsTo en Obra
                attributes: ["id", "nombre"],
              },
            ],
          },
          {
            model: Exposicion,
            as: "Exposicion", // alias del belongsTo en ObraExpuesta
            attributes: ["id", "nombre", "lugar", "fecha_inicio", "fecha_fin"],
          },
        ],
      });

      res.status(200).json(asignaciones);
    } catch (error) {
      console.error("❌ Error al obtener obras expuestas:", error);
      res.status(500).json({ message: "Error al obtener las obras expuestas" });
    }
  },

  async assignObraToExposicion(req, res) {
    try {
      const { id_obra, id_exposicion } = req.body;

      // Verificar si la obra y la exposición existen
      const obra = await Obra.findByPk(id_obra);
      const exposicion = await Exposicion.findByPk(id_exposicion);

      if (!obra) return res.status(404).json({ message: "Obra no encontrada" });
      if (!exposicion) return res.status(404).json({ message: "Exposición no encontrada" });

      // Verificar si ya existe la misma asignación
      const asignacionExistente = await ObraExpuesta.findOne({
        where: {
          id_obra,
          id_exposicion
        }
      });

      if (asignacionExistente) {
        return res.status(400).json({ 
          message: "Esta obra ya está asignada a esta exposición" 
        });
      }

      // Si no existe, crear la nueva asignación
      const nuevaAsignacion = await ObraExpuesta.create({ id_obra, id_exposicion });
      
      // Incluir datos relacionados en la respuesta
      const resultado = await ObraExpuesta.findByPk(nuevaAsignacion.id, {
        include: [
          {
            model: Obra,
            as: "Obra",
            attributes: ["id", "titulo"],
            include: [{
              model: Artista,
              as: "artista",
              attributes: ["id", "nombre"]
            }]
          },
          {
            model: Exposicion,
            as: "Exposicion",
            attributes: ["id", "nombre", "lugar"]
          }
        ]
      });

      res.status(201).json(resultado);
    } catch (error) {
      console.error("Error en assignObraToExposicion:", error);
      res.status(500).json({ 
        message: "Error al asignar la obra a la exposición",
        error: error.message 
      });
    }
  },


  async removeObraFromExposicion(req, res) {
    try {
      const { id } = req.params;
      const asignacion = await ObraExpuesta.findByPk(id);
      if (!asignacion) return res.status(404).json({ message: "Asignación no encontrada" });

      await asignacion.destroy();
      res.status(200).json({ message: "Asignación eliminada correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar la asignación" });
    }
  },
};
