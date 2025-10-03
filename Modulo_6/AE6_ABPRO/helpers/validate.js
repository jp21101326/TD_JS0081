// helpers/validate.js
import chalk from "chalk";

export function validarCompra(input, detalles) {
  const { pelicula, horario, boletos } = input;

  if (!detalles) {
    throw new Error(`La película "${pelicula}" no existe o no tiene el horario "${horario}".`);
  }

  if (boletos <= 0 || !Number.isInteger(boletos)) {
    throw new Error("La cantidad de boletos debe ser un entero positivo.");
  }

  // Mensaje amable si el nombre ingresado difiere en mayúsculas/minúsculas o espacios
  if (pelicula.trim() !== detalles.titulo) {
    console.warn(
      chalk.yellow(`Advertencia: intentando compra para "${pelicula}". Se usará coincidencia: "${detalles.titulo}".`)
    );
  }
}