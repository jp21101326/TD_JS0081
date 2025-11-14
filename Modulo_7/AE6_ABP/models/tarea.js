// models/tarea.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tarea = sequelize.define('tarea', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: true },
  estado: { 
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pendiente',
    validate: {
      isIn: [['pendiente', 'en progreso', 'completada']]
    }
  },
  fecha_vencimiento: { type: DataTypes.DATE, allowNull: true },
});

module.exports = Tarea;
