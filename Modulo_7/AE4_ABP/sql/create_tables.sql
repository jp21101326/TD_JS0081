
--crear base de datos
CREATE DATABASE db_tienda;

-- Conectarse a la DB: db_tienda

-- Crear tablas
CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE
);

CREATE TABLE IF NOT EXISTS productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  stock INT NOT NULL CHECK (stock >= 0)
);

CREATE TABLE IF NOT EXISTS pedidos (
  id SERIAL PRIMARY KEY,
  cliente_id INT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  producto_id INT NOT NULL REFERENCES productos(id) ON DELETE RESTRICT,
  cantidad INT NOT NULL CHECK (cantidad > 0),
  fecha TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Datos de ejemplo para productos
INSERT INTO productos (nombre, stock) VALUES
('Teclado Mecánico', 10),
('Mouse Óptico', 25),
('Monitor 24"', 5)
ON CONFLICT DO NOTHING;
