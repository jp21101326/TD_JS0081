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

  async getAllLibrosPostgres() {
    const result = await pool.query('SELECT * FROM libros ORDER BY id');
    return result.rows;
  }

  async findLibroByIdPostgres(id) {
    const result = await pool.query('SELECT * FROM libros WHERE id = $1', [id]);
    return result.rows[0];
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

  async comprar(id, cantidad) {
    if (this.storageMode === 'postgres') {
      return await this.comprarLibroPostgres(id, cantidad);
    }
    return await this.comprarLibroJson(id, cantidad);
  }
}

module.exports = new Libro();