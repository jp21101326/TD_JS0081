function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ errors: err.errors.map(e => e.message) });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ errors: err.errors.map(e => e.message) });
  }

  return res.status(500).json({ message: 'Error interno del servidor' });
}

module.exports = errorHandler;
