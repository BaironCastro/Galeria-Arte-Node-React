
const Artista = require('./Artista');
const Obra = require('./Obra');
const Exposicion = require('./Exposicion');
const ObraExpuesta = require('./ObraExpuesta');

// Relaciones

Artista.hasMany(Obra, { as: "obras", foreignKey: "id_artista" });
Obra.belongsTo(Artista, { as: "artista", foreignKey: "id_artista" });

// 🔹 Relación Obra → ObraExpuesta
Obra.hasMany(ObraExpuesta, { as: "obrasExpuestas", foreignKey: "id_obra" });
ObraExpuesta.belongsTo(Obra, { as: "Obra", foreignKey: "id_obra" });

// 🔹 Relación Exposicion → ObraExpuesta
Exposicion.hasMany(ObraExpuesta, { as: "obrasAsignadas", foreignKey: "id_exposicion" });
ObraExpuesta.belongsTo(Exposicion, { as: "Exposicion", foreignKey: "id_exposicion" });

module.exports = { Artista, Obra, Exposicion, ObraExpuesta };