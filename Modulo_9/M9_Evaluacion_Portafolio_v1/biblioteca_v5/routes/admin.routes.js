import { Router } from "express";
import { verificarToken } from "../middleware/auth.middleware.js";
import { getUsuarios, guardarUsuarios } from "../models/user.model.js";
import { getLibros } from "../models/book.model.js";

const router = Router();

router.get("/", verificarToken, (req, res) => {
  res.render("admin");
});

// Usuarios
router.get("/usuarios", verificarToken, (req, res) => {
  const usuarios = getUsuarios();
  res.render("adminUsuarios", { usuarios });
});

router.get("/usuarios/:id/editar", verificarToken, (req, res) => {
  const usuarios = getUsuarios();
  const usuario = usuarios.find(u => u.id == req.params.id);
  res.render("editarUsuario", { usuario });
});

router.post("/usuarios/:id/editar", verificarToken, (req, res) => {
  const usuarios = getUsuarios();
  const usuario = usuarios.find(u => u.id == req.params.id);
  usuario.username = req.body.username;
  guardarUsuarios(usuarios);
  res.redirect("/admin/usuarios");
});

router.get("/usuarios/:id/eliminar", verificarToken, (req, res) => {
  let usuarios = getUsuarios();
  usuarios = usuarios.filter(u => u.id != req.params.id);
  guardarUsuarios(usuarios);
  res.redirect("/admin/usuarios");
});

// Libros
router.get("/libros", verificarToken, (req, res) => {
  const libros = getLibros();
  res.render("adminLibros", { libros });
});

export default router;
