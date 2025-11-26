// models/usuario.model.js (CommonJS)
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../data/usuarios.json');

function read() {
  try {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    console.error("Error leyendo usuarios.json:", e);
    return [];
  }
}

function write(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = { read, write };
