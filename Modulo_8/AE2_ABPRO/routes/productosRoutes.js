const router = require('express').Router();
const controller = require('../controllers/productos.controllers');

// Parámetros por URL
router.get('/parametros/:categoria/:marca', (req, res) => {
  const { categoria, marca } = req.params;
  res.status(200).json({
    mensaje: 'Parámetros recibidos por URL',
    categoria,
    marca
  });
});

// Parámetros por query string
router.get('/busqueda', (req, res) => {
  const { nombre, maxPrecio } = req.query;
  res.status(200).json({
    mensaje: 'Parámetros recibidos por query string',
    nombre: nombre || 'No especificado',
    maxPrecio: maxPrecio || 'No especificado'
  });
});

// Datos por cuerpo (body)
router.post('/ver-body', (req, res) => {
  const datos = req.body;
  res.status(200).json({
    mensaje: 'Datos recibidos por el cuerpo de la petición',
    datos
  });
});

// Simulación de error controlado
router.get('/error/simulado', (req, res, next) => {
  next(new Error('Error simulado en el servidor'));
});

// 🔹 Parte 2: CRUD REST
router.get('/', controller.getProductos);
router.get('/:id', controller.getProductoPorId);
router.post('/', controller.postProducto);
router.put('/:id', controller.putProducto);
router.delete('/:id', controller.deleteProducto);

module.exports = router;
