const jwt = require('jsonwebtoken');
const Users = require('../models/users.model');
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No se proporcionó token' });
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Formato de token inválido' });
    const token = parts[1];
    if (!SECRET_KEY) return res.status(500).json({ message: 'Servidor no configurado para validar tokens' });
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Token inválido o expirado' });
      const user = Users.buscarPorUsername(decoded.username);
      if (!user) return res.status(401).json({ message: 'Usuario no existe' });
      req.user = { username: user.username, role: user.role, id: user.id };
      next();
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en autenticación' });
  }
};


module.exports = { verifyToken };
