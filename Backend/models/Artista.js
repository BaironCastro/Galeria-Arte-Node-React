const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Artista = sequelize.define("Artista", {
  nombre: { type: DataTypes.STRING, allowNull: false },
  nacionalidad: DataTypes.STRING,
  estilo: DataTypes.STRING
}, {
  freezeTableName: true, // evita pluralización
  timestamps: false
});

module.exports = Artista;
