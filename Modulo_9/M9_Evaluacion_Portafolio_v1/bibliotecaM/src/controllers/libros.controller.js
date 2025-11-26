import { getLibros, saveLibros } from '../models/libro.model.js';

export const listarLibros = (req, res) => {
  const libros = getLibros();
  res.render('libros', { libros });
};

export const comprarLibro = (req, res) => {
  const id = parseInt(req.params.id);
  const cantidad = parseInt(req.body.cantidad);
  if (isNaN(cantidad) || cantidad <= 0) {
    return res.render('mensaje', { mensaje: 'Cantidad inválida' });
  }

  const libros = getLibros();
  const libro = libros.find(l => l.id === id);
  if (!libro) return res.render('mensaje', { mensaje: 'Libro no encontrado' });

  if (libro.cantidad_disponible < cantidad) {
    return res.render('mensaje', { mensaje: 'Cantidad insuficiente' });
  }

  libro.cantidad_disponible -= cantidad;
  saveLibros(libros);

  return res.render('mensaje', { mensaje: `Compra exitosa. Compraste ${cantidad} unidad(es) de "${libro.nombre}".` });
};
