// controllers/cart.controller.js
const libroModel = require('../models/libro.model');
const cartModel = require('../models/cart.model');
const ticketModel = require('../models/ticket.model');

/**
 * Estructura cartModel:
 * [
 *   { username: 'juan', items: [{ libroId:1, nombre:'Clean Code', cantidad:2, precio:15000 }] },
 *   ...
 * ]
 */

exports.verCarrito = (req, res) => {
  const username = req.user.username;
  const carritos = cartModel.read();
  const carrito = carritos.find(c => c.username === username) || { username, items: [] };
  // calcular total
  const total = carrito.items.reduce((s, it) => s + (it.precio || 0) * it.cantidad, 0);
  res.render('carrito', { carrito, total });
};

exports.agregarAlCarrito = (req, res) => {
  const username = req.user.username;
  const { libroId, cantidad } = req.body;
  const qty = parseInt(cantidad, 10) || 1;
  const id = parseInt(libroId, 10);

  if (!id || qty <= 0) {
    return res.render('mensaje', { mensaje: 'Datos inválidos para agregar al carrito' });
  }

  const libros = libroModel.read();
  const libro = libros.find(l => l.id === id);
  if (!libro) return res.render('mensaje', { mensaje: 'Libro no encontrado' });
  if (libro.cantidad_disponible < 1) return res.render('mensaje', { mensaje: 'Libro sin stock' });

  const carritos = cartModel.read();
  let carrito = carritos.find(c => c.username === username);
  if (!carrito) {
    carrito = { username, items: [] };
    carritos.push(carrito);
  }

  const existing = carrito.items.find(i => i.libroId === id);
  if (existing) {
    existing.cantidad += qty;
  } else {
    carrito.items.push({
      libroId: libro.id,
      nombre: libro.nombre,
      cantidad: qty,
      precio: libro.precio || 0
    });
  }

  cartModel.write(carritos);
  return res.redirect('/carrito');
};

exports.quitarDelCarrito = (req, res) => {
  const username = req.user.username;
  const { libroId } = req.body;
  const id = parseInt(libroId, 10);
  if (!id) return res.render('mensaje', { mensaje: 'ID inválido' });

  const carritos = cartModel.read();
  const carrito = carritos.find(c => c.username === username);
  if (!carrito) return res.render('mensaje', { mensaje: 'No tienes carrito' });

  carrito.items = carrito.items.filter(i => i.libroId !== id);
  // si queda vacío, puedes decidir eliminar el carrito o dejarlo vacío
  cartModel.write(carritos);
  return res.redirect('/carrito');
};

exports.checkout = (req, res) => {
  const username = req.user.username;
  const carritos = cartModel.read();
  const carrito = carritos.find(c => c.username === username);

  if (!carrito || carrito.items.length === 0) {
    return res.render('mensaje', { mensaje: 'Tu carrito está vacío' });
  }

  // validar stock
  const libros = libroModel.read();
  for (const item of carrito.items) {
    const libro = libros.find(l => l.id === item.libroId);
    if (!libro) return res.render('mensaje', { mensaje: `El libro ${item.nombre} ya no existe` });
    if (libro.cantidad_disponible < item.cantidad) {
      return res.render('mensaje', { mensaje: `Stock insuficiente para "${item.nombre}". Disponible: ${libro.cantidad_disponible}` });
    }
  }

  // decrementar stock
  for (const item of carrito.items) {
    const libro = libros.find(l => l.id === item.libroId);
    libro.cantidad_disponible -= item.cantidad;
  }
  libroModel.write(libros);

  // generar ticket
  const tickets = ticketModel.read();
  const nextId = tickets.length ? Math.max(...tickets.map(t => t.id)) + 1 : 1;
  const total = carrito.items.reduce((s, it) => s + (it.precio || 0) * it.cantidad, 0);
  const ticket = {
    id: nextId,
    username,
    items: carrito.items,
    total,
    fecha: new Date().toISOString()
  };
  tickets.push(ticket);
  ticketModel.write(tickets);

  // vaciar carrito del usuario
  const updatedCarritos = carritos.filter(c => c.username !== username);
  cartModel.write(updatedCarritos);

  // render mensaje con ticket
  return res.render('mensaje', { mensaje: `Compra exitosa. Ticket #${ticket.id}`, ticket });
};
