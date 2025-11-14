const { listar, crear, actualizar, eliminar, buscarPorId } = require('../models/usuario.model');

// GET /saludo → retorna saludo
const saludo = (req, res) => {
  res.status(200).json({ mensaje: 'Hola! Bienvenido a la API, M8_AE2_ABP-Ejercicio individual' });
};

// POST /usuario → confirma creación
const crearUsuario = (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    return res.status(400).json({ error: 'El campo \"nombre\" es obligatorio' });
  }

  const nuevo = crear({ nombre: nombre.trim(), email: email || null });
  res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario: nuevo });
};

// PUT /usuario/:id → confirma actualización
const actualizarUsuario = (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  const existente = buscarPorId(id);
  if (!existente) return res.status(404).json({ error: 'Usuario no encontrado' });

  const actualizado = actualizar(id, req.body);
  res.status(200).json({ mensaje: `Usuario con ID ${id} actualizado correctamente`, usuario: actualizado });
};

// DELETE /usuario/:id → confirma eliminación
const eliminarUsuario = (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

  const exito = eliminar(id);
  if (!exito) return res.status(404).json({ error: 'Usuario no encontrado' });

  res.status(200).json({ mensaje: `Usuario con ID ${id} eliminado correctamente` });
};

// Ejemplo con req.params
const mostrarParametros = (req, res) => {
  const { nombre, edad } = req.params;
  res.status(200).json({ mensaje: `Parámetros recibidos`, nombre, edad });
};

// Ejemplo con req.query
const mostrarQuery = (req, res) => {
  const { busqueda } = req.query;
  res.status(200).json({ mensaje: `Parámetro query recibido`, busqueda: busqueda || 'No se envió parámetro' });
};

module.exports = {
  saludo,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  mostrarParametros,
  mostrarQuery,
};
