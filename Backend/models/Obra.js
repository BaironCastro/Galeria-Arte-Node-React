const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Artista = require("./Artista");

const Obra = sequelize.define("Obra", {
  titulo: { type: DataTypes.STRING, allowNull: false },
  anio: DataTypes.INTEGER,
  tecnica: DataTypes.STRING
}, {
  freezeTableName: true, // evita pluralización
  timestamps: false
});

Artista.hasMany(Obra, { foreignKey: "id_artista" });
Obra.belongsTo(Artista, { foreignKey: "id_artista" });

module.exports = Obra;
