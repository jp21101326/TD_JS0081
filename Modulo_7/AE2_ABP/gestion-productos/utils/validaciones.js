function validarString(valor, campo) {
  if (!valor || typeof valor !== 'string') throw new Error(`El campo ${campo} debe ser un texto válido`);
}

function validarNumero(valor, campo) {
  if (isNaN(valor)) throw new Error(`El campo ${campo} debe ser numérico`);
}

module.exports = { validarString, validarNumero };
