import { readJson, writeJson } from '../utils/jsonStore.js';
const LIBROS_FILE = 'data/libros.json';


export async function listarLibrosDisponibles() {
const libros = await readJson(LIBROS_FILE);
return libros;
}


export async function obtenerLibroPorId(id) {
const libros = await readJson(LIBROS_FILE);
return libros.find(l => l.id === id) || null;
}


export async function descontarStockLibro(id, cantidad) {
const libros = await readJson(LIBROS_FILE);
const idx = libros.findIndex(l => l.id === id);
if (idx === -1) throw new Error('Libro no encontrado');
if (libros[idx].cantidad_disponible < cantidad) throw new Error('Cantidad no disponible');
libros[idx].cantidad_disponible -= cantidad;
await writeJson(LIBROS_FILE, libros);
return libros[idx];
}