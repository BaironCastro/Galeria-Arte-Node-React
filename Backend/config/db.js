const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("galeria_arte", "root", "", {
  host: "localhost",
  dialect: "mysql", // cambia a 'postgres' si usas PostgreSQL u otras bases de datos
  logging: false
});

module.exports = sequelize;
