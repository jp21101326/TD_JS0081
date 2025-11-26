module.exports = {
  secret: process.env.JWT_SECRET || 'clave_secreta_por_defecto',
  expiresIn: '24h'
};