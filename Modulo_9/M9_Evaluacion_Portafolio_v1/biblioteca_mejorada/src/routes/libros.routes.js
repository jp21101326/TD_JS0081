import { Router } from 'express';
import { listarLibros, comprarLibro } from '../controllers/libros.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Vista principal
router.get('/libros', listarLibros);

// RUTA para compra via view (usaremos verifyToken pero primero inyectamos token desde la sesión)
router.post('/libros/:id/comprar', (req, res, next) => {
  // si hay token en la sesión, ponlo en body para que verifyToken lo lea
  if (req.session && req.session.token && !req.body.token) {
    req.body.token = req.session.token;
  }
  next();
}, verifyToken, comprarLibro);

/* ---------------------------
   Carrito (session-based)
   --------------------------- */
router.post('/carrito/add', (req, res) => {
  const { id, cantidad } = req.body;
  const cant = parseInt(cantidad) || 1;
  if (!req.session.cart) req.session.cart = [];
  const existing = req.session.cart.find(i => i.id === Number(id));
  if (existing) existing.cantidad += cant;
  else req.session.cart.push({ id: Number(id), cantidad: cant });
  return res.redirect('/carrito');
});

router.get('/carrito', (req, res) => {
  // mostrar carrito con detalles de libros
  const libros = getLibros();
  const cart = (req.session.cart || []).map(item => {
    const libro = libros.find(l => l.id === item.id);
    return {
      ...item,
      nombre: libro ? libro.nombre : 'Libro no encontrado',
      precio: libro ? libro.precio : 0
    };
  });
  res.render('carrito', { cart });
});

// Checkout: usa token de sesión si existe
router.post('/carrito/checkout', (req, res, next) => {
  if (req.session && req.session.token) req.body.token = req.session.token;
  next();
}, verifyToken, async (req, res) => {
  // Procesa cada item en el carrito usando la función comprarLibro existente
  const cart = req.session.cart || [];
  if (cart.length === 0) return res.render('mensaje', { mensaje: 'Carrito vacío' });

  // Nota: reusamos la lógica de compras del controlador; podrías extraer la lógica a una función
  // para no duplicar. Aquí haremos compras una por una y acumularemos mensajes.
  const mensajes = [];
  for (const item of cart) {
    // Simula una petición a comprarLibro: podemos llamar a la función comprarLibro
    // pero comprarLibro espera req/res; por simplicidad, delegamos a una función auxiliar
  }

  // Simplificación: para mantenerlo simple ahora, redirigimos a una ruta que haga el proceso
  res.redirect('/carrito/procesar');
});

// Ruta que procesa el carrito (implementa la lógica en controlador para evitar duplicación)
router.get('/carrito/procesar', verifyToken, async (req, res) => {
  // implementar lógica de procesamiento en el controlador (ver cambios en libros.controller)
  // se asume que se decrementa stock por cada item y se limpia req.session.cart
  res.render('mensaje', { mensaje: 'Compra procesada (implementa lógica server-side).' });
});

/* ---------------------------
   API JSON (para Postman)
   --------------------------- */
router.get('/api/libros', (req, res) => {
  const libros = getLibros();
  res.json(libros);
});

router.get('/api/libros/:id', (req, res) => {
  const id = Number(req.params.id);
  const libro = findLibroById(id);
  if (!libro) return res.status(404).json({ error: 'No encontrado' });
  res.json(libro);
});

router.post('/api/libros/:id/comprar', verifyToken, comprarLibro);

export default router;
