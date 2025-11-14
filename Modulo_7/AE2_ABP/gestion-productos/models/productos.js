const pool = require('../db/pool');
const { validarString, validarNumero } = require('../utils/validaciones');

// Crear producto
const crearProducto = async (producto) => {
  const { nombre, precio, categoria, stock } = producto;
  validarString(nombre, 'nombre');
  validarNumero(precio, 'precio');
  validarString(categoria, 'categoria');
  validarNumero(stock, 'stock');

  const query = 'INSERT INTO productos (nombre, precio, categoria, stock) VALUES ($1, $2, $3, $4) RETURNING *';
  const result = await pool.query(query, [nombre, precio, categoria, stock]);
  return result.rows[0];
};

// Listar productos (uso de cursor)
const obtenerProductos = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DECLARE productos_cursor CURSOR FOR SELECT * FROM productos');
    let productos = [];
    let fetchResult;
    do {
      fetchResult = await client.query('FETCH 2 FROM productos_cursor');
      productos = productos.concat(fetchResult.rows);
    } while (fetchResult.rows.length > 0);

    await client.query('CLOSE productos_cursor');
    await client.query('COMMIT');
    return productos;
  } finally {
    client.release();
  }
};

// Buscar por ID
const obtenerProductoPorId = async (id) => {
  const idNum = Number(id);

  if (isNaN(idNum)) {
    throw new Error('El campo id debe ser numérico');
  }
  const result = await pool.query('SELECT * FROM productos WHERE id = $1', [idNum]);
  if (result.rows.length === 0) {
    throw new Error(`No se encontró un producto con id ${idNum}`);
  }
  return result.rows[0];
};


// Eliminar
const eliminarProducto = async (id) => {
  validarNumero(id, 'id');
  await pool.query('DELETE FROM productos WHERE id = $1', [id]);
};

// Obtener productos con cursor (versión independiente)
const obtenerProductosCursor = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DECLARE productos_cursor CURSOR FOR SELECT * FROM productos');
    
    let productos = [];
    let resultado;

    do {
      resultado = await client.query('FETCH 2 FROM productos_cursor');
      productos = productos.concat(resultado.rows);
    } while (resultado.rows.length > 0);

    await client.query('CLOSE productos_cursor');
    await client.query('COMMIT');

    return productos;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error en obtenerProductosCursor:', error.message);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  eliminarProducto,
  obtenerProductosCursor 
};


