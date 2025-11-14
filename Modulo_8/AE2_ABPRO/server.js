const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Importar rutas
const productosRoutes = require('./routes/productosRoutes');
app.use('/api/v1/productos', productosRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.status(200).json({
    mensaje: 'Servidor REST de Productos funcionando correctamente'
  });
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error detectado:', err.message);
  res.status(500).json({
    error: 'Error interno del servidor',
    detalle: err.message
  });
});

// Middleware 404 (debe ir al final)
app.use((req, res) => {
  res.status(404).json({
    estado: 'ERROR',
    mensaje: `Ruta ${req.originalUrl} no encontrada.`,
    codigo: 404
  });
});

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
