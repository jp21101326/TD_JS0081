import express from "express";
import { routerItems } from "./routes/routerItems.js"
import { errorMiddleware } from "./middleware/errorMiddleware.js";

// Crear aplicacion
const app = express()

// Rutas
app.route("/").get((req, res) => {
    res.redirect('/items');
});

// Manejar Rutas "/items/*" con routerItems
app.use("/items", routerItems);

// Manejar rutas no capturadas anteriormente
app.all("/{*ruta}", (req, res) => {
  const ruta = `http://localhost:${port}/${req.params.ruta}`;

  return res.status(404).json({
    error: {
      message: `Página ruta ${ruta}, no encontrada`,
    },
  });
});

// Middleware de Manejo de Errores Personalizado
// Debe ser el último middleware agregado y debe tener la firma o signature de cuatro argumentos: (err, req, res, next)
app.use(errorMiddleware);

// Puerto
const port = 8080;

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});