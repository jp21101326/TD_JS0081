const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_DIR = path.join(__dirname, '..', 'db');
const DB_FILE = path.join(DB_DIR, 'users.json');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
}

const readUsers = () => {
  try {
    const content = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Error leyendo users.json', err);
    return [];
  }
};

const writeUsers = (users) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
};

const listarUsuarios = () => readUsers();

const buscarPorUsername = (username) => readUsers().find(u => u.username === username);

const crearUsuario = async ({ username, password, role = 'user' }) => {
  const users = readUsers();
  if (users.some(u => u.username === username)) throw new Error('Usuario ya existe');
  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
    username,
    password: hashed,
    role
  };
  users.push(newUser);
  writeUsers(users);
  
  return { id: newUser.id, username: newUser.username, role: newUser.role };
};


module.exports = { 
  listarUsuarios, 
  buscarPorUsername, 
  crearUsuario 
};
