const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// Obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM libros ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener los libros:', error);
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
});

// buscar por autor o título 
router.get('/buscar', async (req, res) => {
  const { q } = req.query;
  try {
    const result = await pool.query(
      `SELECT * FROM libros WHERE LOWER(titulo) LIKE LOWER($1) OR LOWER(autor) LIKE LOWER($1)`,
      [`%${q}%`]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error en la búsqueda' });
  }
});

module.exports = router;
