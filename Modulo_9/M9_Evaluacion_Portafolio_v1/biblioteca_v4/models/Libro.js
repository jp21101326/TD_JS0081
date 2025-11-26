const fs = require('fs').promises;
const path = require('path');
const { pool } = require('../config/database');

const LIBROS_FILE = path.join(__dirname, '../data/libros.json');

class Libro {
  constructor() {
    this.storageMode = process.env.STORAGE_MODE || 'json';
    this.initJsonStorage();
  }

  async initJsonStorage() {
    if (this.storageMode === 'json') {
      try {
        await fs.access(LIBROS_FILE);
      } catch {
        await fs.mkdir(path.dirname(LIBROS_FILE), { recursive: true });
        const librosIniciales = [
          {
            id: 1,
            nombre: "Cien Años de Soledad",
            autor: "Gabriel García Márquez",
            precio: 15000,
            cantidad_disponible: 10
          },
          {
            id: 2,
            nombre: "1984",
            autor: "George Orwell",
            precio: 12000,
            cantidad_disponible: 8
          },
          {
            id: 3,
            nombre: "El Principito",
            autor: "Antoine de Saint-Exupéry",
            precio: 8000,
            cantidad_disponible: 15
          },
          {
            id: 4,
            nombre: "Don Quijote de la Mancha",
            autor: "Miguel de Cervantes",
            precio: 18000,
            cantidad_disponible: 5
          },
          {
            id: 5,
            nombre: "Orgullo y Prejuicio",
            autor: "Jane Austen",
            precio: 13000,
            cantidad_disponible: 7
          }
        ];
        await fs.writeFile(LIBROS_FILE, JSON.stringify(librosIniciales, null, 2));
      }
    }
  }

  // ========== MÉTODOS JSON ==========
  
  async getAllLibrosJson() {
    try {
      const data = await fs.readFile(LIBROS_FILE, 'utf8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async saveLibrosJson(libros) {
    await fs.writeFile(LIBROS_FILE, JSON.stringify(libros, null, 2));
  }

  async findLibroByIdJson(id) {
    const libros = await this.getAllLibrosJson();
    return libros.find(l => l.id === parseInt(id));
  }

  async createJson(libroData) {
    const libros = await this.getAllLibrosJson();
    const newId = libros.length > 0 ? Math.max(...libros.map(l => l.id)) + 1 : 1;
    
    const newLibro = {
      id: newId,
      nombre: libroData.nombre,
      autor: libroData.autor || 'Autor desconocido',
      precio: libroData.precio || 0,
      cantidad_disponible: libroData.cantidad_disponible || 0
    };

    libros.push(newLibro);
    await this.saveLibrosJson(libros);
    return newLibro;
  }

  async updateJson(id, updateData) {
    const libros = await this.getAllLibrosJson();
    const index = libros.findIndex(l => l.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Libro no encontrado');
    }

    // Solo actualizar los campos proporcionados
    if (updateData.nombre !== undefined) libros[index].nombre = updateData.nombre;
    if (updateData.autor !== undefined) libros[index].autor = updateData.autor;
    if (updateData.precio !== undefined) libros[index].precio = updateData.precio;
    if (updateData.cantidad_disponible !== undefined) {
      libros[index].cantidad_disponible = updateData.cantidad_disponible;
    }

    await this.saveLibrosJson(libros);
    return libros[index];
  }

  async deleteJson(id) {
    const libros = await this.getAllLibrosJson();
    const index = libros.findIndex(l => l.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Libro no encontrado');
    }

    libros.splice(index, 1);
    await this.saveLibrosJson(libros);
    return true;
  }

  async comprarLibroJson(id, cantidad) {
    const libros = await this.getAllLibrosJson();
    const libro = libros.find(l => l.id === parseInt(id));

    if (!libro) {
      throw new Error('Libro no encontrado');
    }

    if (libro.cantidad_disponible < cantidad) {
      throw new Error(`Stock insuficiente. Solo hay ${libro.cantidad_disponible} unidades disponibles`);
    }

    libro.cantidad_disponible -= cantidad;
    await this.saveLibrosJson(libros);
    return libro;
  }

  // ========== MÉTODOS POSTGRESQL ==========

  async getAllLibrosPostgres() {
    const result = await pool.query('SELECT * FROM libros ORDER BY id');
    return result.rows;
  }

  async findLibroByIdPostgres(id) {
    const result = await pool.query('SELECT * FROM libros WHERE id = $1', [id]);
    return result.rows[0];
  }

  async createPostgres(libroData) {
    const result = await pool.query(
      'INSERT INTO libros (nombre, autor, precio, cantidad_disponible) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        libroData.nombre, 
        libroData.autor || 'Autor desconocido', 
        libroData.precio || 0, 
        libroData.cantidad_disponible || 0
      ]
    );
    return result.rows[0];
  }

  async updatePostgres(id, updateData) {
    // Construir query dinámicamente
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (updateData.nombre !== undefined) {
      updates.push(`nombre = $${paramCount}`);
      values.push(updateData.nombre);
      paramCount++;
    }
    if (updateData.autor !== undefined) {
      updates.push(`autor = $${paramCount}`);
      values.push(updateData.autor);
      paramCount++;
    }
    if (updateData.precio !== undefined) {
      updates.push(`precio = $${paramCount}`);
      values.push(updateData.precio);
      paramCount++;
    }
    if (updateData.cantidad_disponible !== undefined) {
      updates.push(`cantidad_disponible = $${paramCount}`);
      values.push(updateData.cantidad_disponible);
      paramCount++;
    }

    if (updates.length === 0) {
      throw new Error('No hay campos para actualizar');
    }

    values.push(id);
    const query = `UPDATE libros SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;

    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      throw new Error('Libro no encontrado');
    }

    return result.rows[0];
  }

  async deletePostgres(id) {
    const result = await pool.query('DELETE FROM libros WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      throw new Error('Libro no encontrado');
    }

    return true;
  }

  async comprarLibroPostgres(id, cantidad) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const result = await client.query('SELECT * FROM libros WHERE id = $1 FOR UPDATE', [id]);
      const libro = result.rows[0];

      if (!libro) {
        throw new Error('Libro no encontrado');
      }

      if (libro.cantidad_disponible < cantidad) {
        throw new Error(`Stock insuficiente. Solo hay ${libro.cantidad_disponible} unidades disponibles`);
      }

      await client.query(
        'UPDATE libros SET cantidad_disponible = cantidad_disponible - $1 WHERE id = $2',
        [cantidad, id]
      );

      await client.query('COMMIT');
      
      libro.cantidad_disponible -= cantidad;
      return libro;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async importFromJsonToPostgres() {
    const libros = await this.getAllLibrosJson();
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      await client.query('TRUNCATE TABLE libros RESTART IDENTITY CASCADE');
      
      for (const libro of libros) {
        await client.query(
          'INSERT INTO libros (nombre, autor, precio, cantidad_disponible) VALUES ($1, $2, $3, $4)',
          [libro.nombre, libro.autor, libro.precio, libro.cantidad_disponible]
        );
      }
      
      await client.query('COMMIT');
      return { success: true, count: libros.length };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // ========== MÉTODOS PÚBLICOS (Deciden qué storage usar) ==========

  async getAll() {
    if (this.storageMode === 'postgres') {
      return await this.getAllLibrosPostgres();
    }
    return await this.getAllLibrosJson();
  }

  async findById(id) {
    if (this.storageMode === 'postgres') {
      return await this.findLibroByIdPostgres(id);
    }
    return await this.findLibroByIdJson(id);
  }

  async create(libroData) {
    if (this.storageMode === 'postgres') {
      return await this.createPostgres(libroData);
    }
    return await this.createJson(libroData);
  }

  async update(id, updateData) {
    if (this.storageMode === 'postgres') {
      return await this.updatePostgres(id, updateData);
    }
    return await this.updateJson(id, updateData);
  }

  async delete(id) {
    if (this.storageMode === 'postgres') {
      return await this.deletePostgres(id);
    }
    return await this.deleteJson(id);
  }

  async comprar(id, cantidad) {
    if (this.storageMode === 'postgres') {
      return await this.comprarLibroPostgres(id, cantidad);
    }
    return await this.comprarLibroJson(id, cantidad);
  }
}

module.exports = new Libro();