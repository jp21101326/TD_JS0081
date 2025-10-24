// models/empleado.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Empleado = sequelize.define('empleado', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
});

module.exports = Empleado;
