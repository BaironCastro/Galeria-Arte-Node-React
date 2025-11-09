const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Exposicion = sequelize.define("Exposicion", {
  nombre: { type: DataTypes.STRING, allowNull: false },
  lugar: DataTypes.STRING,
  fecha_inicio: DataTypes.DATE,
  fecha_fin: DataTypes.DATE
}, {
  freezeTableName: true, // evita pluralización
  timestamps: false
});

module.exports = Exposicion;
