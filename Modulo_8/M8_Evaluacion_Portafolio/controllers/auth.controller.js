const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../models/users.model');

const SECRET_KEY = process.env.SECRET_KEY;
const TOKEN_EXPIRES = process.env.TOKEN_EXPIRES_IN || '1h';
const REFRESH_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: 'Usuario y password obligatorios' });

    if (typeof username !== 'string' || username.length < 3) {
      return res.status(400).json({ message: 'Username debe tener al menos 3 caracteres' });
    }
    if (typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ message: 'Password debe tener al menos 6 caracteres' });
    }

    const user = await Users.crearUsuario({ username, password });

    return res.status(201).json({ message: 'Usuario registrado', user });
  } catch (err) {
    if (err.message.includes('Usuario ya existe')) {
      return res.status(400).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: 'Error en registro' });
  }
};

const login = (req, res) => {
  try {
    const { username, password } = req.body;

    const user = Users.buscarPorUsername(username);
    if (!user)
      return res.status(401).json({ message: 'Credenciales inválidas' });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid)
      return res.status(401).json({ message: 'Credenciales inválidas' });

    if (!SECRET_KEY)
      return res
        .status(500)
        .json({ message: 'Servidor no configurado para emitir tokens' });

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      SECRET_KEY,
      { expiresIn: TOKEN_EXPIRES }
    );

    const refreshToken = jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: REFRESH_EXPIRES,
    });

    Users.guardarRefreshToken(username, refreshToken);

    return res.json({ message: 'Login exitoso', token, refreshToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error en login' });
  }
};

const refresh = (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken)
      return res.status(400).json({ message: 'refreshToken requerido' });

    const stored = Users.buscarPorRefreshToken(refreshToken);
    if (!stored)
      return res.status(401).json({ message: 'Refresh token inválido' });

    jwt.verify(refreshToken, SECRET_KEY, (err, decoded) => {
      if (err)
        return res
          .status(401)
          .json({ message: 'Refresh token inválido o expirado' });

      const user = Users.buscarPorId(decoded.id);
      if (!user) return res.status(401).json({ message: 'Usuario no existe' });

      const newToken = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        SECRET_KEY,
        { expiresIn: TOKEN_EXPIRES }
      );

      return res.json({ token: newToken });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error en refresh' });
  }
};

const logout = (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'refreshToken requerido' });
    const user = Users.buscarPorRefreshToken(refreshToken);
    if (!user) return res.status(400).json({ message: 'Refresh token no válido' });
    Users.guardarRefreshToken(user.username, null);
    return res.json({ message: 'Logout correcto' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error en logout' });
  }
};

module.exports = { register, login, refresh, logout };
