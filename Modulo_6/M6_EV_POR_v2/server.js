// server.js
const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Configuración
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const dataPath = path.join(__dirname, "data", "productos.json");

// Leer productos
async function leerProductos() {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Guardar productos
async function guardarProductos(productos) {
  await fs.writeFile(dataPath, JSON.stringify(productos, null, 2));
}

// Listar productos
app.get("/", async (req, res) => {
  const productos = await leerProductos();
  res.render("index", { productos });
});

// Formulario agregar
app.get("/agregar", (req, res) => {
  res.render("agregar");
});

// Guardar nuevo producto
app.post("/agregar", async (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const productos = await leerProductos();

  const nuevo = {
    id: Date.now(),
    nombre,
    descripcion,
    precio: Number(precio),
    fechaCreacion: new Date().toISOString(),
  };

  productos.push(nuevo);
  await guardarProductos(productos);
  res.redirect("/");
});

// Formulario editar
app.get("/editar/:id", async (req, res) => {
  const productos = await leerProductos();
  const producto = productos.find(p => p.id == req.params.id);
  if (!producto) return res.status(404).render("error", { mensaje: "Producto no encontrado" });
  res.render("editar", { producto });
});

// Actualizar producto
app.post("/editar/:id", async (req, res) => {
  const productos = await leerProductos();
  const index = productos.findIndex(p => p.id == req.params.id);

  if (index === -1) return res.status(404).render("error", { mensaje: "Producto no encontrado" });

  productos[index] = {
    ...productos[index],
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: Number(req.body.precio),
    ultimaEdicion: new Date().toISOString(),
  };

  await guardarProductos(productos);
  res.redirect("/");
});

// Eliminar producto
app.post("/eliminar/:id", async (req, res) => {
  let productos = await leerProductos();
  productos = productos.filter(p => p.id != req.params.id);
  await guardarProductos(productos);
  res.redirect("/");
});

// Error 404
app.use((req, res) => {
  res.status(404).render("error", { mensaje: "Página no encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
