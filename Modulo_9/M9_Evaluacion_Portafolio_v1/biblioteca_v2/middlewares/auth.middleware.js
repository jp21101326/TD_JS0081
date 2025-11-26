const jwt = require('jsonwebtoken');
// Mapa en memoria para tokens activos (token -> {username, expires})
const activeTokens = new Map();
const SECRET = process.env.SECRET_KEY || 'SECRET_KEY';
const TOKEN_TTL_SECONDS = 10 * 60; // 10 minutos (ajusta)

function storeToken(token, username){
  const expires = Date.now() + TOKEN_TTL_SECONDS*1000;
  activeTokens.set(token, { username, expires });
}
function isTokenActive(token){
  const entry = activeTokens.get(token);
  if(!entry) return false;
  if(Date.now() > entry.expires){ activeTokens.delete(token); return false; }
  return true;
}
function verifyToken(req,res,next){
  let token = req.headers['authorization'] || req.body.token || req.query.token;
  if(!token) return res.status(401).render('mensaje',{mensaje:'Token requerido'});
  if(token.startsWith('Bearer ')) token = token.split(' ')[1];
  try{
    const decoded = jwt.verify(token, SECRET);
    if(!isTokenActive(token)) return res.status(401).render('mensaje',{mensaje:'Token expirado'});
    req.user = decoded;
    req.token = token;
    next();
  }catch(e){
    return res.status(401).render('mensaje',{mensaje:'Token inválido'});
  }
}
module.exports = { verifyToken, storeToken, activeTokens, TOKEN_TTL_SECONDS, SECRET };
