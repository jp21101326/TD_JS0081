require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const usersRoutes = require('./routes/users.routes');
const filesRoutes = require('./routes/files.routes');

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.SECRET_KEY) {
  console.warn('Atención: SECRET_KEY no definido en .env. JWT no funcionará correctamente.');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB máximo por petición
  abortOnLimit: true
}));

const UPLOADS_DIR = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(UPLOADS_DIR));

app.use('/api/users', usersRoutes);
app.use('/api/files', filesRoutes);

// Middleware de manejo errores (último)
app.use((err, req, res, next) => {
  console.error(err);
  if (err && err.message && err.message.includes('File too large')) {
    return res.status(413).json({ message: 'Archivo demasiado grande' });
  }
  res.status(err.status || 500).json({ message: err.message || 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
