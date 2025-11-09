const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ObraExpuesta = sequelize.define("ObraExpuesta", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_obra: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Obra',
      key: 'id'
    }
  },
  id_exposicion: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Exposicion',
      key: 'id'
    }
  }
}, {
  tableName: 'ObraExpuesta', 
  timestamps: false
}, {
  freezeTableName: true, // evita pluralización
});

module.exports = ObraExpuesta;


