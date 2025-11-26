import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUsuarios, saveUsuarios } from '../models/usuario.model.js';

export const register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.render('mensaje', { mensaje: 'Ingrese usuario y contraseña' });

  const usuarios = getUsuarios();
  const exists = usuarios.find(u => u.username === username);
  if (exists) return res.render('mensaje', { mensaje: 'El usuario ya existe' });

  const hashed = bcrypt.hashSync(password, 10);
  usuarios.push({ username, password: hashed });
  saveUsuarios(usuarios);

  return res.render('mensaje', { mensaje: 'Registro exitoso' });
};

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

