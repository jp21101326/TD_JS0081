// server.js
import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import hbs from "hbs";
import fs from "fs";

// Cargar .env
dotenv.config();

// Rutas del proyecto (asegúrate de que existen estos archivos)
import usuariosRoutes from "./routes/usuarios.routes.js";
import authRoutes from "./routes/auth.routes.js";
import librosRoutes from "./routes/libros.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// View engine - HBS (views y partials)
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Helpers HBS
hbs.registerHelper("gt", (a, b) => Number(a) > Number(b));
hbs.registerHelper("eq", (a, b) => String(a) === String(b));

// Exponer info del usuario en vistas (si hay token)
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "cambiar_este_secreto";

app.use((req, res, next) => {
  try {
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if (token) {
      const payload = jwt.verify(token, JWT_SECRET);
      // pasar datos de usuario a las vistas
      res.locals.currentUser = { id: payload.id, username: payload.username, isAdmin: payload.isAdmin };
    } else {
      res.locals.currentUser = null;
    }
  } catch (err) {
    // token inválido/expirado: eliminar cookie si existe
    res.clearCookie("token");
    res.locals.currentUser = null;
  }
  next();
});

// Rutas principales
app.get("/", (req, res) => {
  res.render("index", { user: res.locals.currentUser });
});

// Montar routers
app.use("/auth", authRoutes);          // login / logout
app.use("/usuarios", usuariosRoutes);  // registro y gestión de usuarios (vistas y API)
app.use("/libros", librosRoutes);      // CRUD libros + comprar
app.use("/admin", adminRoutes);        // panel admin (usuarios y libros)

// Fallback 404 (vista o JSON según Accept)
app.use((req, res) => {
  if (req.accepts("html")) return res.status(404).render("404", { url: req.originalUrl });
  if (req.accepts("json")) return res.status(404).json({ error: "Not found" });
  return res.status(404).type("txt").send("Not found");
});

// Error handler
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  if (req.accepts("html")) {
    return res.status(500).render("500", { error: err.message });
  }
  if (req.accepts("json")) {
    return res.status(500).json({ error: "Server error" });
  }
  res.status(500).type("txt").send("Server error");
});

// Asegurar archivos data si no existen (crear JSON vacíos)
const ensureDataFiles = () => {
  const dataDir = path.join(__dirname, "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
  const usuariosFile = path.join(dataDir, "usuarios.json");
  const librosFile = path.join(dataDir, "libros.json");
  if (!fs.existsSync(usuariosFile)) fs.writeFileSync(usuariosFile, JSON.stringify([
    { id: 1, username: "admin", password: "", isAdmin: true }
  ], null, 2));
  if (!fs.existsSync(librosFile)) fs.writeFileSync(librosFile, JSON.stringify([
    { id: 1, nombre: "Ejemplo: Aprendiendo Node.js", cantidad_disponible: 5 }
  ], null, 2));
};

ensureDataFiles();

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`Modo: ${process.env.NODE_ENV || "development"}`);
});
