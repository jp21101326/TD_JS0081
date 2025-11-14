const fs = require('fs');
const path = require('path');

const ruta = path.join(__dirname, '../db/productos.json');

/**
 * Lee el archivo JSON y devuelve un array de productos.
 * Si no existe el archivo, lo crea con [].
 */
const listarProductos = () => {
  try {
    if (!fs.existsSync(ruta)) {
      fs.writeFileSync(ruta, '[]', 'utf8');
      return [];
    }
    const data = fs.readFileSync(ruta, 'utf8');
    if (!data || !data.trim()) return [];
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al leer productos:', err.message);
    return [];
  }
};

const buscarProductoPorId = (id) => {
  const productos = listarProductos();
  return productos.find(p => String(p.id) === String(id)) || null;
};

const crearProducto = (producto) => {
  const productos = listarProductos();
  // Generar nuevo id: si los ids son numéricos usamos max+1, si no, generamos con timestamp
  let nuevoId;
  const numericIds = productos.every(p => !isNaN(Number(p.id)));
  if (numericIds) {
    nuevoId = productos.length ? Math.max(...productos.map(p => Number(p.id))) + 1 : 1;
  } else {
    nuevoId = Date.now().toString(36);
  }

  const nuevoProducto = { id: nuevoId, ...producto };
  productos.push(nuevoProducto);

  fs.writeFileSync(ruta, JSON.stringify(productos, null, 2), 'utf8');
  return nuevoProducto;
};

const actualizarProducto = (id, datos) => {
  const productos = listarProductos();
  const idx = productos.findIndex(p => String(p.id) === String(id));
  if (idx === -1) return null;

  productos[idx] = { ...productos[idx], ...datos };
  fs.writeFileSync(ruta, JSON.stringify(productos, null, 2), 'utf8');
  return productos[idx];
};

const eliminarProducto = (id) => {
  const productos = listarProductos();
  const nuevos = productos.filter(p => String(p.id) !== String(id));
  if (nuevos.length === productos.length) return false;
  fs.writeFileSync(ruta, JSON.stringify(nuevos, null, 2), 'utf8');
  return true;
};

module.exports = {
  listarProductos,
  buscarProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
