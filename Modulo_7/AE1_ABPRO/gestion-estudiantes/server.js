const express = require('express');
const pool = require('./db/pool');
const estudiantesRouter = require('./routes/estudiantes');

const app = express();
const PORT = 8080;

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/estudiantes', estudiantesRouter);
app.get('/', (req, res) => res.redirect('/estudiantes'));

// Ruta raíz
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estudiantes  ORDER BY id ASC');
    res.render('index', { 
      titulo: 'App Estudiantes',   
      estudiantes: result.rows,
      activePage: 'home'                
    });
  } catch (error) {
    res.status(500).send('Error al cargar Listado de Estudiantes');
  }
});

// Cerrar pool
process.on('SIGINT', async () => {
  await pool.end();
  console.log('Pool cerrado. Servidor detenido.');
  process.exit();
});

app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
