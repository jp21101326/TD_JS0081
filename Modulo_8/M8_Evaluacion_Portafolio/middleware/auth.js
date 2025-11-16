const jwt = require('jsonwebtoken');
const Users = require('../models/users.model');

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
  return res.status(500).json({ message: 'Servidor mal configurado: falta SECRET_KEY' });
}

const verifyToken = (req, res, next) => {
  try {
    const authHeader =
      req.headers['authorization'] || req.headers['Authorization'];

    if (!authHeader)
      return res.status(401).json({ message: 'No se proporcionó token' });

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer')
      return res.status(401).json({ message: 'Formato de token inválido' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err)
        return res
          .status(401)
          .json({ message: 'Token inválido o expirado' });

      const user = Users.buscarPorId(decoded.id);
      if (!user) return res.status(401).json({ message: 'Usuario no existe' });

      req.user = { id: user.id, username: user.username, role: user.role };

      next();
    });
  } catch (err) {
    res.status(500).json({ message: 'Error en autenticación' });
  }
};

module.exports = { verifyToken };

