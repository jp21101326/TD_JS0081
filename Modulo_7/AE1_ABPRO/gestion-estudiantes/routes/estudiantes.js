const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// Listar todos los estudiantes
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estudiantes ORDER BY id ASC');
    res.render('index', { 
      titulo: 'Detalle de Estudiantes', 
      estudiantes: result.rows,
      activePage: 'home',
      mensaje: req.query.msg || ''
    });
  } catch (error) {
    console.error('Error al listar estudiantes:', error);
    res.status(500).send('Error al listar estudiantes');
  }
});

// Buscar estudiante
router.get('/buscar', async (req, res) => {
  const { q } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM estudiantes WHERE LOWER(nombre) LIKE LOWER($1) OR LOWER(correo) LIKE LOWER($1)`,
      [`%${q}%`]
    );
    res.render('index', { 
      titulo: `Resultados de búsqueda para "${q}"`, 
      estudiantes: result.rows,
      activePage: 'home',
      mensaje: ''
    });
  } catch (error) {
    console.error('Error en búsqueda:', error);
    res.status(500).send('Error en la búsqueda');
  }
});

// Formulario para agregar
router.get('/nuevo', (req, res) => {
  res.render('nuevo', { titulo: 'Agregar Estudiante', activePage: 'nuevo' });
});

// Agregar estudiante (POST)
router.post('/nuevo', async (req, res) => {
  const { nombre, edad, correo } = req.body;
  try {
    await pool.query('INSERT INTO estudiantes (nombre, edad, correo) VALUES ($1, $2, $3)', [nombre, edad, correo]);
    res.redirect('/estudiantes?msg=agregado');
  } catch (error) {
    console.error('Error al agregar estudiante:', error);
    res.status(500).send('Error al agregar estudiante');
  }
});

// Formulario para editar
router.get('/editar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM estudiantes WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).send('Estudiante no encontrado');
    res.render('editar', { estudiante: result.rows[0], titulo: 'Editar Estudiante', activePage: 'editar' });
  } catch (error) {
    res.status(500).send('Error al cargar el formulario de edición');
  }
});

// Actualizar estudiante (POST)
router.post('/editar/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, edad, correo } = req.body;
  try {
    await pool.query('UPDATE estudiantes SET nombre = $1, edad = $2, correo = $3 WHERE id = $4', [nombre, edad, correo, id]);
    res.redirect('/estudiantes?msg=editado');
  } catch (error) {
    console.error('Error al editar estudiante:', error);
    res.status(500).send('Error al editar estudiante');
  }
});

// Eliminar estudiante
router.get('/eliminar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM estudiantes WHERE id = $1', [id]);
    res.redirect('/estudiantes?msg=eliminado');
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
    res.status(500).send('Error al eliminar estudiante');
  }
});

router.get('/json', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estudiantes ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener estudiantes (JSON):', error);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
});

module.exports = router;

