import { getUsuarios, crearUsuario, guardarUsuarios } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const registrarUsuario = (req, res) => {
  const { username, password } = req.body;

  const usuarios = getUsuarios();
  const existe = usuarios.find(u => u.username === username);

  if (existe) {
    return res.render("register", { error: "El usuario ya existe" });
  }

  const hashed = bcrypt.hashSync(password, 10);

  crearUsuario({ username, password: hashed });

  res.render("register", { success: "Usuario registrado correctamente" });
};

export const listarUsuarios = (req, res) => {
  const usuarios = getUsuarios();
  res.json(usuarios);
};

export const eliminarUsuario = (req, res) => {
  const { id } = req.params;
  let usuarios = getUsuarios();

  usuarios = usuarios.filter(u => u.id != id);

  guardarUsuarios(usuarios);
  res.json({ mensaje: "Usuario eliminado" });
};
