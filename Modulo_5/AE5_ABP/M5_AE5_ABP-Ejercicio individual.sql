-- ===============================================================================================================================
-- Dseñar un ERD para una tienda en línea que gestiona información sobre clientes, pedidos y productos. 
-- Cada pedido está asociado a un cliente y contiene detalles sobre los productos solicitados, como nombre, descripción y precio
-- ===============================================================================================================================


CREATE TABLE clientes (
    id_cliente  SERIAL PRIMARY KEY,
    nombre      VARCHAR(50) NOT NULL,
    apellido    VARCHAR(50) NOT NULL,
    direccion   VARCHAR(100),
    correo      VARCHAR(100) UNIQUE NOT NULL
);


CREATE TABLE productos (
    id_producto  SERIAL PRIMARY KEY,
    nombre       VARCHAR(100) NOT NULL,
    descripcion  VARCHAR(100) NOT NULL,
    precio       NUMERIC(10,2) NOT NULL CHECK (precio >= 0)
);


CREATE TABLE pedidos (
    id_pedido    SERIAL PRIMARY KEY,
    id_cliente   INT NOT NULL,
    fecha_pedido date DEFAULT CURRENT_DATE,
    estado       VARCHAR(20) DEFAULT 'pendiente',
    
    CONSTRAINT fk_pedido_cliente
        FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


CREATE TABLE detalle_pedidos (
    id_detalle   SERIAL PRIMARY KEY,
    id_pedido    INT NOT NULL,
    id_producto  INT NOT NULL,
    cantidad     INT NOT NULL CHECK (cantidad > 0),
    subtotal     NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
    
    CONSTRAINT fk_detalle_pedido
        FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
        
    CONSTRAINT fk_detalle_producto
        FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- ========================================
-- Datos de prueba opcionales
-- ========================================

INSERT INTO clientes (nombre, apellido, direccion, correo) VALUES
('Juan', 'Pérez', 'Av.Santa Eelena 123', 'juanperez@email.com'),
('María', 'López', 'Calle las torres 456', 'maria.lopez@email.com');


INSERT INTO productos (nombre, descripcion, precio) VALUES
('Laptop', 'Notebook Ryzen 5 con 32GB RAM y 512GB SSD', 1750.00),
('Parlantes', 'Parlante portatil inalámbrico', 6500.50),
('Auriculares', 'Auriculares Bluetooth con micrófono', 123.99);


INSERT INTO pedidos (id_cliente, estado) VALUES (1, 'en proceso');


INSERT INTO detalle_pedidos (id_pedido, id_producto, cantidad, subtotal) VALUES
(1, 1, 1, 750.00),   
(1, 2, 2, 41.00);    
