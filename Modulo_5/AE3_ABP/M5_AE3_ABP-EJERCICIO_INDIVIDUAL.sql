/*
 * -- Crear tablas 
 */

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre    VARCHAR(60) NOT NULL,
    direccion VARCHAR(60),
    telefono  VARCHAR(12)
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INT NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
    fecha      DATE NOT NULL,
    total      NUMERIC(10,2) NOT NULL
);

 
/*
 * 	Inserta al menos cinco nuevos clientes en la tabla "clientes".
 */
INSERT INTO clientes (nombre, direccion, telefono) VALUES
('Juan Salar'       , 'Av. El Descanso  # 123'     , '987654321'),
('Luis Troncoso'    , 'Av. Pajaritos   # 1500'     , '998712345'),
('Victor López'     , 'Av. Las Torres  # 789'      , '912356987'),
('Erika Valle'      , 'Av. Providencia # 58'       , '926677889'),
('Alejandro Ramírez', 'AV. Pedro de Valdivia # 233', '923467896');


/*
 * Inserta al menos diez nuevos pedidos en la tabla "pedidos". Asegúrate de asignar
 * correctamente el cliente correspondiente a cada pedido utilizando la columna "cliente_id"
 */
INSERT INTO pedidos (cliente_id, fecha, total) VALUES
(1, '2025-01-10', 15000),
(1, '2025-02-15', 23000),
(2, '2025-01-20', 18000),
(2, '2025-02-25', 12000),
(2, '2025-03-18', 25000),
(3, '2025-04-12', 17000),
(3, '2025-02-22', 14000),
(4, '2025-08-26', 22000),
(4, '2025-08-25', 26000),
(5, '2025-03-16', 19500);


/*
 *  Proyecta todos los clientes de la tabla "clientes" y sus respectivos pedidos.
 */
SELECT c.id, c.nombre, c.direccion, c.telefono, p.id AS pedido_id, p.fecha, p.total
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
ORDER BY c.id, p.fecha;

 
/*
 * 	Proyecta todos los pedidos realizados por un cliente específico, utilizando su ID.
 */
SELECT * FROM pedidos
WHERE cliente_id = 4;

SELECT c.id, c.nombre, c.direccion, c.telefono, p.id AS pedido_id, p.fecha, p.total
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
where c.id = 4
ORDER BY c.id, p.fecha;


/*
 * Calcula el total de todos los pedidos para cada cliente.
 */
SELECT c.id, c.nombre, SUM(p.total) AS total_pedidos
FROM clientes c
LEFT JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id, c.nombre
ORDER BY total_pedidos DESC;

 
/*
 * Actualiza la dirección de un cliente dado su "id".
 */
UPDATE clientes
SET direccion = 'Nueva Dirección 999'
WHERE id = 3;

 
/*
 * Elimina un cliente específico de la tabla "clientes" y todos sus pedidos asociados de la tabla
 * "pedidos".
 */
DELETE FROM clientes
WHERE id = 4;

 
/*
 * Proyecta los tres clientes que han realizado más pedidos, ordenados de forma descendente
 * por el número de pedidos.
 */
SELECT c.id, c.nombre, COUNT(p.id) AS numero_pedidos
FROM clientes c
JOIN pedidos p ON c.id = p.cliente_id
GROUP BY c.id, c.nombre
ORDER BY numero_pedidos DESC
LIMIT 3;

