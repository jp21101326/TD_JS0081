// import jwt from "jsonwebtoken";
// export function verificarToken(req, res, next) {
// const token = req.cookies?.token;
//   if (!token) {
//      return res.redirect("/auth/login");
//   }
//   try {
//     jwt.verify(token, "secreto123");
//     next();
//   } catch (err) {
//     return res.redirect("/auth/login");
//   }
// }



// middleware/auth.middleware.js
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto_local";

export function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (!token) {
      // redirigir a login y dejar la página solicitada para volver luego
      return res.redirect('/auth/login?redirect=' + encodeURIComponent(req.originalUrl));
    }
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;            // disponible en controladores
    res.locals.currentUser = payload; // disponible en vistas
    next();
  } catch (err) {
    return res.redirect('/auth/login?redirect=' + encodeURIComponent(req.originalUrl));
  }
}
