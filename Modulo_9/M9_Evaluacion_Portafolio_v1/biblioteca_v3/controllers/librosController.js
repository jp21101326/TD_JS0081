const Libro = require('../models/Libro');

class LibrosController {
  async getAll(req, res) {
    try {
      const libros = await Libro.getAll();
      
      res.json({
        success: true,
        data: libros,
        count: libros.length
      });
    } catch (error) {
      console.error('Error en getAll:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener libros',
        error: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const libro = await Libro.findById(id);

      if (!libro) {
        return res.status(404).json({
          success: false,
          message: 'Libro no encontrado'
        });
      }

      res.json({
        success: true,
        data: libro
      });
    } catch (error) {
      console.error('Error en getById:', error);
      res.status(500).json({
        success: false,
        message: 'Error al obtener libro',
        error: error.message
      });
    }
  }

  async comprar(req, res) {
    try {
      const { id } = req.params;
      const { cantidad } = req.body;

      if (!cantidad || cantidad <= 0) {
        return res.status(400).json({
          success: false,
          message: 'La cantidad debe ser mayor a 0'
        });
      }

      if (!Number.isInteger(cantidad)) {
        return res.status(400).json({
          success: false,
          message: 'La cantidad debe ser un número entero'
        });
      }

      const libro = await Libro.comprar(id, cantidad);

      res.json({
        success: true,
        message: `Compra realizada exitosamente. ${cantidad} unidad(es) de "${libro.nombre}"`,
        data: {
          libro: libro.nombre,
          cantidad_comprada: cantidad,
          cantidad_restante: libro.cantidad_disponible,
          total: libro.precio ? libro.precio * cantidad : null,
          comprador: req.user.username
        }
      });
    } catch (error) {
      console.error('Error en comprar:', error);
      
      if (error.message.includes('Stock insuficiente') || error.message === 'Libro no encontrado') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error al realizar la compra',
        error: error.message
      });
    }
  }

  async importJsonToPostgres(req, res) {
    try {
      if (process.env.STORAGE_MODE !== 'postgres') {
        return res.status(400).json({
          success: false,
          message: 'Esta función solo está disponible en modo PostgreSQL'
        });
      }

      const result = await Libro.importFromJsonToPostgres();
      
      res.json({
        success: true,
        message: `${result.count} libros importados exitosamente desde JSON a PostgreSQL`,
        data: result
      });
    } catch (error) {
      console.error('Error en importJsonToPostgres:', error);
      res.status(500).json({
        success: false,
        message: 'Error al importar datos',
        error: error.message
      });
    }
  }
}

module.exports = new LibrosController();