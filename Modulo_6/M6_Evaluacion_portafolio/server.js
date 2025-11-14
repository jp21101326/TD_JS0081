const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
// Importamos 'fs' para operaciones síncronas de inicialización (mkdirSync)
const fs = require('fs');
// Importamos 'fs/promises' para la lectura y escritura ASÍNCRONA (Requisito 3)
const fsPromises = require('fs').promises;
const path = require('path');
const yargs = require('yargs');

// =========================================================================
// 1. CONFIGURACIÓN INICIAL (Yargs, Express)
// =========================================================================

// Configuración de Yargs para parámetros de entorno
const argv = yargs
  .option('environment', {
    alias: 'env',
    description: 'Entorno de ejecución (dev, test, prod)',
    type: 'string',
    choices: ['dev', 'test', 'prod'],
    default: 'dev'
  })
  .option('port', {
    alias: 'p',
    description: 'Puerto del servidor',
    type: 'number',
    default: 3000
  })
  .argv;

// Inicialización de Express
const app = express();
const PORT = argv.port;
const ENVIRONMENT = argv.environment;

// Directorio y Ruta del archivo de productos
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTOS_FILE = path.join(DATA_DIR, 'productos.json');

// Crear el directorio 'data' si no existe
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
    console.log(chalk.yellow(`[${ENVIRONMENT}] Creado directorio: ${DATA_DIR}`));
}

// Inicializar el archivo de productos si no existe
if (!fs.existsSync(PRODUCTOS_FILE)) {
    fs.writeFileSync(PRODUCTOS_FILE, '[]');
    console.log(chalk.yellow(`[${ENVIRONMENT}] Creado archivo: ${PRODUCTOS_FILE}`));
}

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public'))); 


// =========================================================================
// 2. FUNCIONES ASÍNCRONAS PARA PERSISTENCIA DE DATOS
// =========================================================================
async function leerProductosAsync() {
  try {
    const data = await fsPromises.readFile(PRODUCTOS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(chalk.red(`Error al leer productos (ASÍNCRONO): ${error.message}`));
    }
    return [];
  }
}

async function guardarProductosAsync(productos) {
  try {
    const data = JSON.stringify(productos, null, 2);
    await fsPromises.writeFile(PRODUCTOS_FILE, data);
  } catch (error) {
    console.error(chalk.red(`Error al guardar productos (ASÍNCRONO): ${error.message}`));
    throw new Error('No se pudo guardar el producto debido a un error de escritura.');
  }
}

function generarId(productos) {
  const maxId = productos.reduce((max, producto) => Math.max(max, producto.id || 0), 0);
  return maxId + 1;
}

// =========================================================================
// 3. GESTIÓN DE RUTAS
// =========================================================================

// Ruta básica (/)
app.get('/', (req, res) => {
  res.render('index', {
    titulo: 'Bienvenido a la tienda Online', 
    environment: ENVIRONMENT,
    activePage: 'home'
  });
});

// Ruta /productos (GET - Listar)
app.get('/productos', async (req, res, next) => {
  try {
    const productos = await leerProductosAsync();

    res.render('productos', {
      titulo: 'Listado de Productos',
      productos,
      environment: ENVIRONMENT,
      activePage: 'productos'
    });
  } catch (error) {
    console.error(chalk.red(`[${ENVIRONMENT}] Error en GET /productos:`), error.message);
    next(error); // Pasa el error al middleware general (500)
  }
});

// Ruta /productos/agregar (GET - Mostrar formulario)
app.get('/productos/agregar', (req, res) => {
  res.render('agregar-producto', {
    titulo: 'Agregar Nuevo Producto',
    environment: ENVIRONMENT,
    activePage: 'agregar'
  });
});

// Ruta /productos/agregar (POST - Agregar producto y GUARDAR)
app.post('/productos/agregar', async (req, res, next) => {
  try {
    const { nombre, descripcion, precio } = req.body;

    if (!nombre || !descripcion || !precio) {
      return res.status(400).render('error', { 
        titulo: 'Error de Validación',
        mensaje: 'Todos los campos son obligatorios.',
        error: 'Faltan datos requeridos en el formulario',
        environment: ENVIRONMENT,
        activePage: 'agregar'
      });
    }

    const productos = await leerProductosAsync();
    const nuevoProducto = {
      id: generarId(productos),
      nombre,
      descripcion,
      precio: parseFloat(precio),
      fechaCreacion: new Date().toISOString().split('T')[0],
      ultimaEdicion: new Date().toISOString().split('T')[0]
    };
    productos.push(nuevoProducto);
    await guardarProductosAsync(productos);

    console.log(chalk.green(`[${ENVIRONMENT}] Producto agregado: ${nuevoProducto.nombre}`));
    res.redirect('/productos'); 
  } catch (error) {
    console.error(chalk.red(`[${ENVIRONMENT}] Error en POST /productos/agregar:`), error.message);
    next(error);
  }
});

// Ruta /api/productos (API REST - Listar en JSON)
app.get('/api/productos', async (req, res, next) => {
  try {
    const productos = await leerProductosAsync();
    res.json({
      success: true,
      data: productos,
      total: productos.length
    });
  } catch (error) {
    console.error(chalk.red(`[${ENVIRONMENT}] Error en GET /api/productos:`), error.message);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Ruta /productos/editar/:id (POST - Editar producto)
app.post('/productos/editar/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { nombre, descripcion, precio } = req.body;

        let productos = await leerProductosAsync();
        const index = productos.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado.' });
        }
        
        if (!nombre || !descripcion || !precio) {
            return res.status(400).json({ success: false, message: 'Datos incompletos para actualizar.' });
        }

        productos[index].nombre = nombre;
        productos[index].descripcion = descripcion;
        productos[index].precio = parseFloat(precio);
        productos[index].ultimaEdicion = new Date().toISOString().split('T')[0];

        await guardarProductosAsync(productos);

        console.log(chalk.blue(`[${ENVIRONMENT}] Producto editado: ${nombre} (ID: ${id})`));
        res.status(200).json({ success: true, message: `Producto "${nombre}" actualizado con éxito.` });

    } catch (error) {
        console.error(chalk.red(`[${ENVIRONMENT}] Error en POST /productos/editar/${req.params.id}:`), error.message);
        res.status(500).json({ success: false, message: error.message || 'Error interno del servidor al editar.' });
    }
});


// Ruta /productos/eliminar/:id (POST - Eliminar producto)
app.post('/productos/eliminar/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        
        let productos = await leerProductosAsync();
        const productoAEliminar = productos.find(p => p.id === id);

        if (!productoAEliminar) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado para eliminar.' });
        }

        productos = productos.filter(p => p.id !== id);

        await guardarProductosAsync(productos);

        console.log(chalk.red(`[${ENVIRONMENT}] Producto eliminado: ${productoAEliminar.nombre} (ID: ${id})`));
        res.status(200).json({ success: true, message: `El producto "${productoAEliminar.nombre}" ha sido eliminado.` });

    } catch (error) {
        console.error(chalk.red(`[${ENVIRONMENT}] Error en POST /productos/eliminar/${req.params.id}:`), error.message);
        res.status(500).json({ success: false, message: error.message || 'Error interno del servidor al eliminar.' });
    }
});

// =========================================================================
// 4. MANEJO DE ERRORES
// =========================================================================

// Middleware para manejo de rutas no encontradas (404)
app.use((req, res) => {
  console.log(chalk.yellow(`[${ENVIRONMENT}] Ruta no encontrada: ${req.url}`));
  res.status(404).render('error', {
    titulo: 'Error - Tienda Online',
    mensaje: 'Página no encontrada',
    error: `La ruta ${req.url} no existe en el servidor`,
    environment: ENVIRONMENT,
    activePage: null
  });
});

// Middleware para manejo de errores generales (500)
app.use((err, req, res, next) => {
  console.error(chalk.red(`[${ENVIRONMENT}] Error del servidor:`), err.stack); 
  const errorMessage = ENVIRONMENT === 'dev' ? err.message : 'Ha ocurrido un error inesperado. Intente de nuevo más tarde.';
  
  res.status(500).render('error', {
    titulo: 'Error - Tienda Online',
    mensaje: 'Error interno del servidor',
    error: errorMessage,
    environment: ENVIRONMENT,
    activePage: null
  });
});

// =========================================================================
// 5. INICIAR EL SERVIDOR
// =========================================================================

app.listen(PORT, () => {
  console.log(chalk.green.bold('='.repeat(50)));
  console.log(chalk.cyan(`Servidor corriendo en: http://localhost:${PORT}`));
  console.log(chalk.magenta(`Entorno de ejecución: ${ENVIRONMENT}`));
  console.log(chalk.green.bold('='.repeat(50)));
});