require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const usuariosRoutes = require('./routes/usuarios.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Carga archivo middleware (5 MB limit)
app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
  })
);

// carga estaticas
const UPLOADS_DIR = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(UPLOADS_DIR));

// rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/auth', authRoutes);

// manejador de errores genérico
app.use((err, req, res, next) => {
  console.error(err);
  if (err.message && err.message.includes('File too large')) {
    return res.status(413).json({ message: 'Archivo demasiado grande' });
  }
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});