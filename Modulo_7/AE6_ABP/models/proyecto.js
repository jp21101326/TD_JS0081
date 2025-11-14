// models/proyecto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Proyecto = sequelize.define('proyecto', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: true },
  fecha_inicio: { type: DataTypes.DATE, allowNull: true },
  fecha_fin: { type: DataTypes.DATE, allowNull: true },
});

module.exports = Proyecto;
