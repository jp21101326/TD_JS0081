import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const usersPath = path.join(__dirname, "data", "usuarios.json");

export function getUsuarios() {
  const data = fs.readFileSync(usersPath, "utf-8");
  return JSON.parse(data);
}

export function guardarUsuarios(usuarios) {
  fs.writeFileSync(usersPath, JSON.stringify(usuarios, null, 2));
}

export function crearUsuario(usuario) {
  const usuarios = getUsuarios();
  usuario.id = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
  usuarios.push(usuario);
  guardarUsuarios(usuarios);
}
