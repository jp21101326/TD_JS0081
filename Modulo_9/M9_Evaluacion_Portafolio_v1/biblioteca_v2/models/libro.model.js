// models/libro.model.js
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../data/libros.json');

function read() {
  try {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    console.error("Error leyendo libros.json:", e);
    return [];
  }
}

function write(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function create(titulo, autor, año) {
  const libros = read();
  const nuevo = {
    id: libros.length ? libros[libros.length - 1].id + 1 : 1,
    titulo,
    autor,
    año: año || null,
    cantidad_disponible: 10
  };

  libros.push(nuevo);
  write(libros);
  return nuevo;
}

function findById(id) {
  return read().find(l => l.id === id);
}

function update(id, data) {
  const libros = read();
  const idx = libros.findIndex(l => l.id === id);
  if (idx === -1) return null;

  libros[idx] = { ...libros[idx], ...data };
  write(libros);

  return libros[idx];
}

function remove(id) {
  let libros = read();
  libros = libros.filter(l => l.id !== id);
  write(libros);
}

module.exports = { read, write, create, findById, update, remove };
