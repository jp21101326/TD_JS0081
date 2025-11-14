const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Para procesar JSON en req.body

// Importar rutas principales
const usuarioRoutes = require('./routes/usuarios.routes');
app.use('/', usuarioRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.status(200).json({ mensaje: 'Servidor Express funcionando correctamente' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));
