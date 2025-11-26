import { getLibros, saveLibros, findLibroById } from '../models/libro.model.js';

export const login = (req, res) => {
  const { username, password } = req.body;
  const usuarios = getUsuarios();
  const user = usuarios.find(u => u.username === username);
  if (!user) return res.render('mensaje', { mensaje: 'Usuario no encontrado' });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.render('mensaje', { mensaje: 'Contraseña incorrecta' });

  const token = jwt.sign({ username }, 'SECRET_KEY', { expiresIn: '1h' });

  // Guardar token y usuario en sesión
  req.session.token = token;
  req.session.user = { username }; // puedes guardar más info si quieres

  // Mensaje con token (opcional) pero ya no será necesario pegarlo manualmente
  return res.render('mensaje', { mensaje: 'Login exitoso', token });
};

/* listarLibros: sin cambios (tal como lo tienes) */
export const listarLibros = (req, res) => {
  const libros = getLibros();
  res.render('libros', { libros });
};

/* función helper: intenta comprar n unidades del libro id y devuelve resultado */
export const comprarLibroLogic = (id, cantidad) => {
  const libros = getLibros();
  const libro = libros.find(l => l.id === id);
  if (!libro) return { ok: false, mensaje: 'Libro no encontrado' };
  if (libro.cantidad_disponible < cantidad) return { ok: false, mensaje: 'Cantidad insuficiente' };
  libro.cantidad_disponible -= cantidad;
  saveLibros(libros);
  return { ok: true, mensaje: `Compra exitosa. Compraste ${cantidad} unidad(es) de "${libro.nombre}".` };
};

/* comprarLibro (controlador usado por rutas) */
export const comprarLibro = (req, res) => {
  const id = parseInt(req.params.id);
  const cantidad = parseInt(req.body.cantidad) || 1;

  if (isNaN(cantidad) || cantidad <= 0) {
    return res.render('mensaje', { mensaje: 'Cantidad inválida' });
  }

  const result = comprarLibroLogic(id, cantidad);
  if (!result.ok) {
    // si es llamada desde API (headers aceptan json) devolvemos JSON
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(400).json({ mensaje: result.mensaje });
    }
    return res.render('mensaje', { mensaje: result.mensaje });
  }

  // registrar venta: si quieres llevar contador, agrégalo a un archivo ventas.json aquí

  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.json({ mensaje: result.mensaje });
  }
  return res.render('mensaje', { mensaje: result.mensaje });
};

/* Procesar carrito completo: recibe req.session.cart y procesa cada item */
export const procesarCarrito = (req, res) => {
  const cart = req.session.cart || [];
  if (cart.length === 0) return res.render('mensaje', { mensaje: 'Carrito vacío' });

  const resultados = [];
  for (const item of cart) {
    const id = Number(item.id);
    const qty = Number(item.cantidad);
    const r = comprarLibroLogic(id, qty);
    resultados.push({ id, ok: r.ok, mensaje: r.mensaje });
  }

  // limpiar carrito si al menos una compra fue exitosa
  const algunaOk = resultados.some(r => r.ok);
  if (algunaOk) req.session.cart = [];

  res.render('mensaje', { mensaje: 'Procesamiento completado', resultados });
};