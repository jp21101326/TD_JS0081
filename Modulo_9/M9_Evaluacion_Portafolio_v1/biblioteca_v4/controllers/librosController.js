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

      // Validaciones
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

      // Realizar compra
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

  async create(req, res) {
    try {
      const { nombre, autor, precio, cantidad_disponible } = req.body;

      // Validaciones
      if (!nombre || !cantidad_disponible) {
        return res.status(400).json({
          success: false,
          message: 'Nombre y cantidad disponible son requeridos'
        });
      }

      if (cantidad_disponible < 0) {
        return res.status(400).json({
          success: false,
          message: 'La cantidad disponible no puede ser negativa'
        });
      }

      const libro = await Libro.create({ nombre, autor, precio, cantidad_disponible });

      res.status(201).json({
        success: true,
        message: 'Libro creado exitosamente',
        data: libro
      });
    } catch (error) {
      console.error('Error en create:', error);
      res.status(500).json({
        success: false,
        message: 'Error al crear libro',
        error: error.message
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nombre, autor, precio, cantidad_disponible } = req.body;

      console.log('UPDATE Request:', { id, body: req.body });

      // Validar que al menos un campo sea actualizado
      if (!nombre && !autor && precio === undefined && cantidad_disponible === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Debes proporcionar al menos un campo para actualizar'
        });
      }

      if (cantidad_disponible !== undefined && cantidad_disponible < 0) {
        return res.status(400).json({
          success: false,
          message: 'La cantidad disponible no puede ser negativa'
        });
      }

      const libro = await Libro.update(id, { nombre, autor, precio, cantidad_disponible });

      console.log('Libro actualizado:', libro);

      res.json({
        success: true,
        message: 'Libro actualizado exitosamente',
        data: libro
      });
    } catch (error) {
      console.error('Error en update:', error);
      
      if (error.message === 'Libro no encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error al actualizar libro',
        error: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      await Libro.delete(id);

      res.json({
        success: true,
        message: 'Libro eliminado exitosamente'
      });
    } catch (error) {
      console.error('Error en delete:', error);
      
      if (error.message === 'Libro no encontrado') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      res.status(500).json({
        success: false,
        message: 'Error al eliminar libro',
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