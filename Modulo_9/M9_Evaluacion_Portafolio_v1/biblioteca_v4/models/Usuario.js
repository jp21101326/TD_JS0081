const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');

const USERS_FILE = path.join(__dirname, '../data/usuarios.json');

class Usuario {
  constructor() {
    this.storageMode = process.env.STORAGE_MODE || 'json';
    this.initJsonStorage();
  }

  async initJsonStorage() {
    if (this.storageMode === 'json') {
      try {
        await fs.access(USERS_FILE);
      } catch {
        await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
        await fs.writeFile(USERS_FILE, JSON.stringify([], null, 2));
      }
    }
  }

  async getAllUsersJson() {
    try {
      const data = await fs.readFile(USERS_FILE, 'utf8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async saveUsersJson(users) {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  }

  async createUserJson(username, password) {
    const users = await this.getAllUsersJson();
    
    if (users.find(u => u.username === username)) {
      throw new Error('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    await this.saveUsersJson(users);
    
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async findUserByUsernameJson(username) {
    const users = await this.getAllUsersJson();
    return users.find(u => u.username === username);
  }

  async createUserPostgres(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO usuarios (username, password) VALUES ($1, $2) RETURNING id, username, created_at',
      [username, hashedPassword]
    );
    return result.rows[0];
  }

  async findUserByUsernamePostgres(username) {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE username = $1',
      [username]
    );
    return result.rows[0];
  }

  async create(username, password) {
    if (this.storageMode === 'postgres') {
      return await this.createUserPostgres(username, password);
    }
    return await this.createUserJson(username, password);
  }

  async findByUsername(username) {
    if (this.storageMode === 'postgres') {
      return await this.findUserByUsernamePostgres(username);
    }
    return await this.findUserByUsernameJson(username);
  }

  async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = new Usuario();