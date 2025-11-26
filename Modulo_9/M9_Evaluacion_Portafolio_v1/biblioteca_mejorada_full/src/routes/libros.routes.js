
import { Router } from "express";
import { listarLibros, listarLibrosAPI, comprarLibro, procesarCarrito } from "../controllers/libros.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getLibros } from "../models/libro.model.js";

const router = Router();

router.get("/", (req, res) => res.redirect("/libros"));

router.get("/libros", listarLibros);
router.get("/api/libros", listarLibrosAPI);
router.get("/api/libros/:id", (req,res) => {
  const id = Number(req.params.id);
  const libro = getLibros().find(l => l.id === id);
  if (!libro) return res.status(404).json({ error: "No encontrado" });
  res.json(libro);
});

// comprar via view or api; inject session token automatically
router.post("/libros/:id/comprar", (req, res, next) => {
  if (req.session && req.session.token && !req.body.token) req.body.token = req.session.token;
  next();
}, verifyToken, comprarLibro);

// carrito
router.post("/carrito/add", (req, res) => {
  const { id, cantidad } = req.body;
  if (!req.session.cart) req.session.cart = [];
  const existing = req.session.cart.find(i => i.id === Number(id));
  if (existing) existing.cantidad = Number(existing.cantidad) + Number(cantidad || 1);
  else req.session.cart.push({ id: Number(id), cantidad: Number(cantidad || 1) });
  req.flash("success", "Artículo agregado al carrito");
  res.redirect("/libros");
});

router.get("/carrito", (req, res) => {
  const libros = getLibros();
  const cart = (req.session.cart || []).map(item => {
    const libro = libros.find(l => l.id === item.id);
    return { ...item, nombre: libro ? libro.nombre : "No encontrado", precio: libro ? libro.precio : 0 };
  });
  res.render("carrito", { cart });
});

router.post("/carrito/checkout", (req, res, next) => {
  if (req.session && req.session.token) req.body.token = req.session.token;
  next();
}, verifyToken, procesarCarrito);

export default router;
