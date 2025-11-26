import fs from 'fs';
const file = './src/models/libros.json';

export const getLibros = () => {
  try {
    const data = fs.readFileSync(file, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

export const saveLibros = (libros) => {
  fs.writeFileSync(file, JSON.stringify(libros, null, 2));
};

export const findLibroById = (id) => {
  const libros = getLibros();
  return libros.find(l => l.id === id);
};
