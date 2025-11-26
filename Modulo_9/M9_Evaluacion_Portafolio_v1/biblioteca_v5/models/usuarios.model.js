import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { readJson, writeJson } from '../utils/jsonStore.js';


const USERS_FILE = 'data/users.json';
const SALT_ROUNDS = 10;


export async function crearUsuario(username, password, isAdmin = false) {
const usuarios = await readJson(USERS_FILE);
if (usuarios.find(u => u.username === username)) throw new Error('El nombre de usuario ya existe');
const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
const nuevo = { id: uuidv4(), username, passwordHash, isAdmin };
usuarios.push(nuevo);
await writeJson(USERS_FILE, usuarios);
return { id: nuevo.id, username: nuevo.username, isAdmin: nuevo.isAdmin };
}


export async function buscarUsuarioPorUsername(username) {
const usuarios = await readJson(USERS_FILE);
return usuarios.find(u => u.username === username) || null;
}


export async function buscarUsuarioPorId(id) {
const usuarios = await readJson(USERS_FILE);
return usuarios.find(u => u.id === id) || null;
}


export async function actualizarUsuario(id, { username, password }) {
const usuarios = await readJson(USERS_FILE);
const idx = usuarios.findIndex(u => u.id === id);
if (idx === -1) throw new Error('Usuario no encontrado');
if (username) usuarios[idx].username = username;
if (password) usuarios[idx].passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
await writeJson(USERS_FILE, usuarios);
return { id: usuarios[idx].id, username: usuarios[idx].username };
}


export async function eliminarUsuario(id) {
let usuarios = await readJson(USERS_FILE);
usuarios = usuarios.filter(u => u.id !== id);
await writeJson(USERS_FILE, usuarios);
return true;
}