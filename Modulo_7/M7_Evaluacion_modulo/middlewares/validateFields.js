function validateUsuario(req, res, next) {
  const { nombre, correo, contraseña } = req.body;
  if (!nombre || !correo || !contraseña) {
    return res.status(400).json({ message: 'Faltan campos obligatorios: nombre, correo, contraseña' });
  }
  next();
}


function validateRol(req, res, next) {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ message: 'El campo nombre es obligatorio' });
  }
  next();
}

module.exports = { validateUsuario, validateRol };
