const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_DIR = path.join(__dirname, '..', 'db');
const DB_FILE = path.join(DB_DIR, 'users.json');

if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));

const readUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8') || '[]');
  } catch (err) {
    console.error('Error leyendo DB', err);
    return [];
  }
};

const writeUsers = (users) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
};

const listarUsuarios = () => readUsers();

const buscarPorUsername = (username) => readUsers().find((u) => u.username === username);

const buscarPorId = (id) => readUsers().find((u) => u.id === Number(id));

const crearUsuario = async ({ username, password, role = 'user' }) => {
  const users = readUsers();

  if (users.some((u) => u.username === username))
    throw new Error('Usuario ya existe');

  const hashed = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    username,
    password: hashed,
    role,
    profile: { nombre: '', bio: '', avatar: null },
    refreshToken: null,
  };

  users.push(newUser);
  writeUsers(users);

  const { password: _pw, ...safe } = newUser;
  return safe;
};

const actualizarUsuario = (id, data) => {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === Number(id));

  if (idx === -1) return null;

  users[idx] = { ...users[idx], ...data, id: users[idx].id };
  writeUsers(users);

  const { password, ...safe } = users[idx];
  return safe;
};

const eliminarUsuario = (id) => {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === Number(id));

  if (idx === -1) return false;

  users.splice(idx, 1);
  writeUsers(users);
  return true;
};

const guardarRefreshToken = (username, token) => {
  const users = readUsers();
  const idx = users.findIndex((u) => u.username === username);

  if (idx === -1) return false;

  users[idx].refreshToken = token;
  writeUsers(users);
  return true;
};

const buscarPorRefreshToken = (token) =>
  readUsers().find((u) => u.refreshToken === token);

module.exports = {
  listarUsuarios,
  buscarPorUsername,
  buscarPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  guardarRefreshToken,
  buscarPorRefreshToken,
};
