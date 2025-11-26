// controllers/admin.controller.js
const libroModel = require('../models/libro.model');

/**
 * Funcionalidades:
 * - listarLibrosAdmin: vista con todos los libros y acciones CRUD
 * - formNuevoLibro: render form
 * - crearLibro: añade libro al JSON
 * - formEditarLibro: render form con datos
 * - editarLibro: actualiza libro
 * - eliminarLibro: borra libro
 */

exports.listarLibrosAdmin = (req, res) => {
  const libros = libroModel.read();
  res.render('admin_libros', { libros });
};

exports.formNuevoLibro = (req, res) => {
  res.render('admin_nuevo_libro');
};

exports.crearLibro = (req, res) => {
  const { nombre, cantidad_disponible, precio } = req.body;
  if (!nombre) return res.render('mensaje', { mensaje: 'Nombre requerido' });

  const libros = libroModel.read();
  const nextId = libros.length ? Math.max(...libros.map(l => l.id)) + 1 : 1;
  const libro = {
    id: nextId,
    nombre,
    cantidad_disponible: parseInt(cantidad_disponible, 10) || 0,
    precio: parseFloat(precio) || 0
  };
  libros.push(libro);
  libroModel.write(libros);
  res.redirect('/admin/libros');
};

exports.formEditarLibro = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const libros = libroModel.read();
  const libro = libros.find(l => l.id === id);
  if (!libro) return res.render('mensaje', { mensaje: 'Libro no encontrado' });
  res.render('admin_editar_libro', { libro });
};

exports.editarLibro = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nombre, cantidad_disponible, precio } = req.body;
  const libros = libroModel.read();
  const libro = libros.find(l => l.id === id);
  if (!libro) return res.render('mensaje', { mensaje: 'Libro no encontrado' });

  libro.nombre = nombre || libro.nombre;
  libro.cantidad_disponible = parseInt(cantidad_disponible, 10) || libro.cantidad_disponible;
  libro.precio = parseFloat(precio) || libro.precio;

  libroModel.write(libros);
  res.redirect('/admin/libros');
};

exports.eliminarLibro = (req, res) => {
  const id = parseInt(req.params.id, 10);
  let libros = libroModel.read();
  const exists = libros.some(l => l.id === id);
  if (!exists) return res.render('mensaje', { mensaje: 'Libro no encontrado' });

  libros = libros.filter(l => l.id !== id);
  libroModel.write(libros);
  res.redirect('/admin/libros');
};
