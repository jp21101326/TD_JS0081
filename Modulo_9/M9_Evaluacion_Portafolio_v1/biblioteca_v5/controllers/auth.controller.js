import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUsuarios } from "../models/user.model.js";

export const login = (req, res) => {
  const { username, password } = req.body;

  const usuarios = getUsuarios();
  const usuario = usuarios.find(u => u.username === username);

  if (!usuario) {
    return res.render("login", { error: "Usuario no existe" });
  }

  const valido = bcrypt.compareSync(password, usuario.password);
  if (!valido) {
    return res.render("login", { error: "Credenciales incorrectas" });
  }

  const token = jwt.sign({ id: usuario.id, username }, "secreto123", {
    expiresIn: "1h",
  });

  res.cookie("token", token);
  res.redirect("/libros");
};
