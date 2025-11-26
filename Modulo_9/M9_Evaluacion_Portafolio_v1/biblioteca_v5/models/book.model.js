import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const librosPath = path.join(__dirname, "data", "libros.json");

export function getLibros() {
  const data = fs.readFileSync(librosPath, "utf-8");
  return JSON.parse(data);
}

export function guardarLibros(libros) {
  fs.writeFileSync(librosPath, JSON.stringify(libros, null, 2));
}

export function crearLibro(libro) {
  const libros = getLibros();
  libro.id = libros.length > 0 ? libros[libros.length - 1].id + 1 : 1;
  libros.push(libro);
  guardarLibros(libros);
}
