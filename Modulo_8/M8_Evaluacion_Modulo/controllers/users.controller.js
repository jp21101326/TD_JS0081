const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../models/users.model');
const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Usuario y password obligatorios' });
    const user = await Users.crearUsuario({ username, password, role });
    if (!SECRET_KEY) {
        return res.status(201).json({ message: 'Usuario registrado (sin token, SECRET_KEY no configurada)', user });
    }
    const token = jwt.sign({ username: user.username, role: user.role, id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    return res.status(201).json({ message: 'Usuario registrado', user, token });
  } catch (err) {
    if (err.message && err.message.includes('Usuario ya existe')) return res.status(400).json({ message: err.message });
    console.error(err);
    return res.status(500).json({ message: 'Error en registro' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Usuario y password obligatorios' });
    const user = Users.buscarPorUsername(username);
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });
    if (!SECRET_KEY) return res.status(500).json({ message: 'Servidor no configurado para emitir tokens' });
    const token = jwt.sign({ username: user.username, role: user.role, id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ message: 'Login exitoso', token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error en login' });
  }
};

const profile = (req, res) => {
  const { username, role, id } = req.user;
  res.json({ id, username, role });
};


module.exports = { 
  register, 
  login, 
  profile 
};
