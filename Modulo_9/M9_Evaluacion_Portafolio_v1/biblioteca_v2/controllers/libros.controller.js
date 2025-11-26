const libroModel = require('../models/libro.model');

exports.listarLibros = (req, res) => {
  res.render('libros', { libros: libroModel.read() });
};

exports.crearLibro = (req, res) => {
  const { titulo, autor, año } = req.body;
  if (!titulo || !autor) {
    return res.status(400).json({ message: 'Título y autor son obligatorios' });
  }
  res.json(libroModel.create(titulo, autor, año));
};

exports.obtenerLibro = (req, res) => {
  const libro = libroModel.findById(Number(req.params.id));
  if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });
  res.json(libro);
};

exports.actualizarLibro = (req, res) => {
  const libro = libroModel.update(Number(req.params.id), req.body);
  if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });
  res.json(libro);
};

exports.eliminarLibro = (req, res) => {
  libroModel.remove(Number(req.params.id));
  res.json({ message: 'Libro eliminado' });
};
