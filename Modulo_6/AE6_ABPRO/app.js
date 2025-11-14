// app.js
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";
import { validarCompra } from "./helpers/validate.js";
import { cargarFunciones, buscarFuncion } from "./helpers/functions.js";

const funciones = cargarFunciones();

const argv = yargs(hideBin(process.argv))
  .usage("Uso: $0 --pelicula <nombre> --horario <HH:MM> --boletos <n>")
  .option("pelicula", {
    alias: "p",
    type: "string",
    describe: "Nombre de la película",
    demandOption: true
  })
  .option("horario", {
    alias: "h",
    type: "string",
    describe: "Horario en formato HH:MM (por ejemplo, 19:00)",
    demandOption: true
  })
  .option("boletos", {
    alias: "b",
    type: "number",
    describe: "Cantidad de boletos (entero positivo)",
    demandOption: true
  })
  .check((args) => {
    if (!args.pelicula || typeof args.pelicula !== "string") {
      throw new Error("El parámetro --pelicula es obligatorio y debe ser texto.");
    }
    if (!args.horario || typeof args.horario !== "string") {
      throw new Error("El parámetro --horario es obligatorio y debe ser texto.");
    }
    if (typeof args.boletos !== "number" || !Number.isFinite(args.boletos) || args.boletos <= 0 || !Number.isInteger(args.boletos)) {
      throw new Error("El parámetro --boletos debe ser un número entero positivo.");
    }
    return true;
  })
  .fail((msg) => {
    console.error(chalk.red(`Error: ${msg}`));
    process.exit(1);
  })
  .help()
  .argv;

try {
  const { pelicula, horario, boletos } = argv;

  const detalles = buscarFuncion(funciones, pelicula, horario);

  // Validaciones de negocio (película/horario existentes)
  validarCompra({ pelicula, horario, boletos }, detalles);

  const total = detalles.precio * boletos;

  console.log(
    chalk.green(
      `\nCompra confirmada ✅\n` +
      `Película : ${detalles.titulo}\n` +
      `Horario  : ${horario}\n` +
      `Boletos  : ${boletos}\n` +
      `Precio   : $${detalles.precio.toLocaleString("es-CL")} c/u\n` +
      `Total    : $${total.toLocaleString("es-CL")}\n`
    )
  );
} catch (err) {
  const msg = err?.message || "Ocurrió un error inesperado.";
  console.error(chalk.red(`Error: ${msg}`));
  process.exit(1);
}