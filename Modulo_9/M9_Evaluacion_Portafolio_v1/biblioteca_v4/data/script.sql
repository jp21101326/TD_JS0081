-- Script de base de datos para Sistema de Biblioteca
-- PostgreSQL

-- Crear base de datos
CREATE DATABASE biblioteca;

-- Conectar a la base de datos
\c biblioteca;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de libros
CREATE TABLE IF NOT EXISTS libros (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    autor VARCHAR(255),
    precio DECIMAL(10,2),
    cantidad_disponible INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo en libros
INSERT INTO libros (nombre, autor, precio, cantidad_disponible) VALUES
('Cien Años de Soledad', 'Gabriel García Márquez', 15000, 10),
('1984', 'George Orwell', 12000, 8),
('El Principito', 'Antoine de Saint-Exupéry', 8000, 15),
('Don Quijote de la Mancha', 'Miguel de Cervantes', 18000, 5),
('Orgullo y Prejuicio', 'Jane Austen', 13000, 7),
('Crónica de una Muerte Anunciada', 'Gabriel García Márquez', 11000, 12),
('El Amor en los Tiempos del Cólera', 'Gabriel García Márquez', 14000, 6),
('Harry Potter y la Piedra Filosofal', 'J.K. Rowling', 16000, 20),
('El Señor de los Anillos', 'J.R.R. Tolkien', 25000, 4),
('Rayuela', 'Julio Cortázar', 13500, 9);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_usuarios_username ON usuarios(username);
CREATE INDEX idx_libros_nombre ON libros(nombre);
CREATE INDEX idx_libros_cantidad ON libros(cantidad_disponible);

-- Ver todas las tablas
\dt

-- Consultas de ejemplo
SELECT * FROM usuarios;
SELECT * FROM libros;
SELECT * FROM libros WHERE cantidad_disponible > 0;

-- Comentarios en las tablas
COMMENT ON TABLE usuarios IS 'Tabla de usuarios del sistema';
COMMENT ON TABLE libros IS 'Tabla de libros disponibles en la biblioteca';

COMMENT ON COLUMN usuarios.username IS 'Nombre de usuario único';
COMMENT ON COLUMN usuarios.password IS 'Contraseña hasheada con bcrypt';

COMMENT ON COLUMN libros.nombre IS 'Nombre del libro';
COMMENT ON COLUMN libros.autor IS 'Autor del libro';
COMMENT ON COLUMN libros.precio IS 'Precio en pesos chilenos';
COMMENT ON COLUMN libros.cantidad_disponible IS 'Stock disponible para venta';