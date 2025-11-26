const { read: readUsuarios } = require('../models/usuario.model');
function requireAdmin(req,res,next){
  const username = req.user && req.user.username;
  const usuarios = readUsuarios();
  const u = usuarios.find(x=>x.username===username);
  if(!u || u.role !== 'admin') return res.status(403).render('mensaje',{mensaje:'Acceso admin requerido'});
  next();
}
module.exports = requireAdmin;
