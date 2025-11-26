
import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET || "replace_with_env_jwt_secret";

export const verifyToken = (req, res, next) => {
  let token = null;
  if (req.headers && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }
  token = token || req.body.token || req.query.token || (req.session && req.session.token);

  if (!token) {
    // if request expects json respond with 401 json
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(401).json({ error: "Token requerido" });
    }
    req.flash("error", "Se requiere login para esta acción");
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(401).json({ error: "Token inválido" });
    }
    req.flash("error", "Token inválido o expirado");
    return res.redirect("/login");
  }
};
