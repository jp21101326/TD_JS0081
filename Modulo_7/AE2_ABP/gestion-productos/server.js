const express = require('express');
const path = require('path');
const hbs = require('hbs');
const pool = require('./db/pool');

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de HBS
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Layout principal
hbs.registerHelper('formatData', (data) => {
  if (data instanceof Date) return data.toISOString().split('T')[0];
  if (typeof data === 'string') return data.toUpperCase();
  return data;
});

// Rutas
const productosRoutes = require('./routes/productos.routes');
app.use('/productos', productosRoutes);

// Pool cerrado correctamente al salir
process.on('SIGINT', async () => {
  await pool.end();
  console.log('Pool cerrado. Servidor detenido.');
  process.exit();
});

app.listen(port, () => console.log(`Servidor escuchando en http://localhost:${port}`));
