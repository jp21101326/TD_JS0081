const fs = require('fs');
const path = require('path');
const ruta = path.join(__dirname, '../DB/usuarios.json');

// Cargar datos
const listar = () => JSON.parse(fs.readFileSync(ruta, 'utf8'));

const buscarPorId = (id) => {
  const usuarios = listar();
  return usuarios.find(u => u.id === id) || null;
};

const crear = (usuario) => {
  const usuarios = listar();
  const nuevoId = usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
  usuario.id = nuevoId;
  usuarios.push(usuario);
  fs.writeFileSync(ruta, JSON.stringify(usuarios, null, 2));
  return usuario;
};

const actualizar = (id, datos) => {
  const usuarios = listar();
  const idx = usuarios.findIndex(u => u.id === id);
  if (idx === -1) return null;
  usuarios[idx] = { ...usuarios[idx], ...datos };
  fs.writeFileSync(ruta, JSON.stringify(usuarios, null, 2));
  return usuarios[idx];
};

const eliminar = (id) => {
  const usuarios = listar();
  const nuevos = usuarios.filter(u => u.id !== id);
  fs.writeFileSync(ruta, JSON.stringify(nuevos, null, 2));
  return nuevos.length < usuarios.length;
};

module.exports = { 
  listar, 
  crear, 
  actualizar, 
  eliminar, 
  buscarPorId 
};
