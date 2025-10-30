const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('usuario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: { msg: 'El nombre es obligatorio' } } },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: 'El correo ya está registrado' },
    validate: { isEmail: { msg: 'Debe ser un correo válido' } }
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: { args: [6, 100], msg: 'La contraseña debe tener al menos 6 caracteres' } }
  }
});

module.exports = Usuario;
