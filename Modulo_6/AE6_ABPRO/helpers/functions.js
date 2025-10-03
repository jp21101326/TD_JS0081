// helpers/functions.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function cargarFunciones() {
  const dataPath = path.resolve(__dirname, "../data/funciones.json");
  const raw = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(raw);
}

export function buscarFuncion(funcionesData, peliculaEntrada, horarioEntrada) {
  const norm = (s) => String(s).toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").trim();

  const pNorm = norm(peliculaEntrada);
  const hNorm = norm(horarioEntrada);

  const peli = funcionesData.peliculas.find(
    (p) => norm(p.titulo) === pNorm
  );

  if (!peli) return null;

  const tieneHorario = peli.horarios.some((h) => norm(h) === hNorm);
  if (!tieneHorario) return null;

  return { titulo: peli.titulo, precio: peli.precio, horarios: peli.horarios };
}