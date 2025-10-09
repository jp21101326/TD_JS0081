const express = require('express');
const pool = require('./db/pool');
const librosRouter = require('./routes/libros');

const app = express();
const PORT = 8080;

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/libros', librosRouter);

// Ruta raíz
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM libros ORDER BY id ASC');
    res.render('index', { libros: result.rows });
  } catch (error) {
    res.status(500).send('Error al cargar los libros');
  }
});

// Cerrar pool
process.on('SIGINT', async () => {
  await pool.end();
  console.log('🔌 Pool cerrado. Servidor detenido.');
  process.exit();
});

app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
