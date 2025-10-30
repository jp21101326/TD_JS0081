function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map(e => e.message);
    return res.status(400).json({ errors: messages });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    const messages = err.errors.map(e => e.message);
    return res.status(400).json({ errors: messages });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor'
  });
}


module.exports = errorHandler;
