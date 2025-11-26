import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.body.token || req.query.token;
  if (!authHeader) return res.status(401).render('mensaje', { mensaje: 'Token requerido' });

  // header may be "Bearer <token>"
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).render('mensaje', { mensaje: 'Token inválido' });
  }
};
