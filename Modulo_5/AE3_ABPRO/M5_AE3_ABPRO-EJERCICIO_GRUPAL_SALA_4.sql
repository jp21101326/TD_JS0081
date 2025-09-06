/*
 * -- E3_ABPRO-Ejercicio grupal [Actividad Opcional]
 * -- SALA 4
 */

---------------------------------------
-- 1.- Crear la Base de Datos y Tablas:
---------------------------------------
   CREATE DATABASE RECITRONIC;

   -- Diseñar la base de datos y crear las tablas correspondientes a Clientes, Artículos, Citas, y Pagos.
   -- CLIENTES
   CREATE TABLE clientes (
       id_cliente SERIAL       PRIMARY KEY,
       nombre     VARCHAR(60)  NOT NULL,
       telefono   VARCHAR(20)  NOT NULL,
       direccion  VARCHAR(200) NOT NULL
   );

   -- ARTÍCULOS
   CREATE TABLE articulos (
       id_articulo   SERIAL       PRIMARY KEY,
       id_cliente    INT          NOT NULL,
       tipo_articulo VARCHAR(100) NOT NULL,
       estado        VARCHAR(50)  DEFAULT 'pendiente',
    CONSTRAINT fk_articulos_clientes FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE CASCADE
   );

   -- CITAS
   CREATE TABLE citas (
       id_cita    SERIAL    PRIMARY KEY,
       id_cliente INT       NOT NULL,
       fecha_hora TIMESTAMP NOT NULL,
       CONSTRAINT fk_citas_clientes FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE CASCADE
   );

   -- PAGOS
   CREATE TABLE pagos (
       id_pago    SERIAL        PRIMARY KEY,
       id_cliente INT           NOT NULL,
       monto      DECIMAL(10,2) NOT NULL,
       fecha_pago TIMESTAMP     NOT NULL,
       CONSTRAINT fk_pagos_clientes FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE CASCADE
   );

---------------------------------------
 -- 2.- Realizar Manipulaciones de Datos con SQL:
---------------------------------------
  -- Insertar registros de clientes, artículos reciclados, citas y pagos.
  -- CLIENTES
  INSERT INTO clientes (nombre, telefono, direccion) VALUES
  ('José Pérez'    , '987654321', 'Av. Siempre Viva # 123'),
  ('María González', '912345678', 'Av. Las Torres # 456'),
  ('Victor López'  , '923456789', 'Av. Los Olivos # 789');

  -- ARTÍCULOS
  INSERT INTO articulos (id_cliente, tipo_articulo, estado) VALUES
  (1, 'Notebook HP'      , 'pendiente'),
  (1, 'Tablet Lenovo'    , 'pendiente'),
  (2, 'Monitor LG 27"'   , 'pendiente'),
  (2, 'Impresora HP EcoTank', 'pendiente'),
  (3, 'Tablet Lenovo'    , 'pendiente');

  -- CITAS
  INSERT INTO citas (id_cliente, fecha_hora) VALUES
  (1, '2025-08-26 10:00:00'),
  (2, '2025-08-26 15:30:00'),
  (3, '2025-08-26 11:00:00');

  -- PAGOS
  INSERT INTO pagos (id_cliente, monto, fecha_pago) VALUES
  (1, 15000, '2025-08-26 12:00:00'),
  (2, 20000, '2025-08-26 17:00:00'),
  (3, 12000, '2025-08-26 13:00:00');

  -- Actualizar información sobre las citas y el estado de los artículos reciclados.
   UPDATE citas
   SET fecha_hora = '2025-09-05 09:00:00'
   WHERE id_cita = 2;

   -- Actualizar el estado de un artículo reciclado (por ejemplo, de “pendiente” a “reciclado”)
   UPDATE articulos
   SET estado = 'reciclado'
   WHERE id_articulo = 1;

   -- Eliminar registros de artículos y citas cuando sea necesario.
   DELETE FROM articulos WHERE id_articulo = 4;

   -- Eliminar citas que hayan sido canceladas.
   DELETE FROM citas WHERE id_cita = 3;

---------------------------------------
-- 3.- Demostrar el Uso de Transacciones:
---------------------------------------
   -- muestra todos los clientes y sus artículos
   SELECT c.id_cliente, c.nombre, a.id_articulo, a.tipo_articulo, a.estado
   FROM clientes c
   LEFT JOIN articulos a ON c.id_cliente = a.id_cliente
   ORDER BY c.id_cliente;

   -- Muestra todas las citas ordenadas por fecha y hora
   SELECT * FROM citas ORDER BY fecha_hora;

   -- Muetra todos pagos ordenados por fecha de pago
   SELECT * FROM pagos ORDER BY fecha_pago;

---------------------------------------   
-- 5.-Ejemplo de Rollback y Commit:
---------------------------------------   
   -- Ejemplo de transacción exitosa (COMMIT)
   BEGIN;

   INSERT INTO clientes (nombre, telefono, direccion) 
   VALUES ('Damaris Sepúlveda', '91234567', 'Av. Central # 321');

   INSERT INTO articulos (id_cliente, tipo_articulo, estado) 
   VALUES (4, 'Notebook Asus', 'pendiente');

   INSERT INTO citas (id_cliente, fecha_hora) 
   VALUES (4, '2025-08-27 22:14:00');

   COMMIT;

   -- Ejemplo de transacción fallida con ROLLBACK
   BEGIN;

   -- Intento de insertar un pago para un cliente inexistente
   INSERT INTO pagos (id_cliente, monto, fecha_pago) 
   VALUES (18, 10000, '2025-08-27 22:14:00');

   -- Esta operación no debe persistir porque el cliente 999 no existe
   ROLLBACK;

   
   
  -- CON VALIDACION IF
  	DO $$
	BEGIN
		IF FOUND THEN
		    INSERT INTO clientes (nombre, telefono, direccion) 
            VALUES ('Damaris Sepúlveda', '91234567', 'Av. Central # 321');
		    COMMIT;
		ELSE
		    ROLLBACK;
		END IF;
	END;
	$$;
	

