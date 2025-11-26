import fs from 'fs';
import path from 'path';

// Crea una ruta ABSOLUTA hacia libros.json
const file = path.resolve('src/models/libros.json');

/* ------------------------------------------
   OBTENER LISTA DE LIBROS
--------------------------------------------- */
export const getLibros = () => {
  try {
    const data = fs.readFileSync(file, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error leyendo libros.json:', err.message);
    return [];
  }
};

/* ------------------------------------------
   GUARDAR LISTA DE LIBROS
--------------------------------------------- */
export const saveLibros = (libros) => {
  fs.writeFileSync(file, JSON.stringify(libros, null, 2));
};

/* ------------------------------------------
   BUSCAR LIBRO POR ID
--------------------------------------------- */
export const findLibroById = (id) => {
  const libros = getLibros();
  return libros.find(l => l.id === id);
};
