/*
 *  Crear la base de datos
 */
CREATE DATABASE inventario;

/*
 *  Conectarse a la base manualmente, ya esta opción no es reconocida  en DBeaver.
 */
-- \c inventario;

/*
 *  Creacion de tablas
 */
CREATE TABLE proveedores (
    id_proveedor SERIAL PRIMARY KEY,
    nombre	     VARCHAR(100) NOT NULL,
    direccion	 VARCHAR(150),
    telefono	 VARCHAR(10),
    email		 VARCHAR(100) UNIQUE
);

CREATE TABLE productos (
    id_producto	SERIAL PRIMARY KEY,
    nombre	    VARCHAR(100) NOT NULL,
    descripcion	VARCHAR(150),
    precio	    NUMERIC(10,2) NOT NULL CHECK (precio > 0),
    cantidad	INT NOT NULL CHECK (cantidad >= 0)
);

CREATE TABLE transacciones (
    id_transaccion  SERIAL PRIMARY KEY,
    tipo		    VARCHAR(10) NOT NULL CHECK (tipo IN ('compra','venta')),
    fecha	        DATE NOT NULL DEFAULT CURRENT_DATE,
    cantidad	    INT NOT NULL CHECK (cantidad > 0),
    id_producto	    INT NOT NULL,
    id_proveedor	INT,
    CONSTRAINT fk_producto  FOREIGN KEY (id_producto) REFERENCES productos (id_producto) ON DELETE CASCADE,
    CONSTRAINT fk_proveedor FOREIGN KEY (id_proveedor) REFERENCES proveedores (id_proveedor) ON DELETE SET NULL
);


/*  
 *  --------------------------------------------------------------------
 *  4. Manipulación de Datos (DML)
 *  --------------------------------------------------------------------
 */

/*
 *  Inserta datos en las tablas productos, proveedores y transacciones.
 */
INSERT INTO proveedores (nombre, direccion, telefono, email)
VALUES	('TCHILE' ,'Av. Uno' ,'981276346','ventas@tchile.com'),
		('CDCOMP' ,'Av. Dos' ,'123456789','ventas@cdcom.com'),
 		('INTDATA','Av. Tres','987654321','ventas@intdata.com');

INSERT INTO productos (nombre, descripcion, precio, cantidad)
VALUES	('Parlante','Parlante HD Inalambrico', 2000,  10),
		('Mouse'   ,'Mouse óptico'           , 1000,  20),
		('Monitor' ,'Monitor 24"'            , 125000, 5)

INSERT INTO transacciones (tipo, fecha, cantidad, id_producto, id_proveedor) 
VALUES	('compra','2025-08-01',  5, 1, 1),
		('venta' ,'2025-08-10',  2, 1, Null),
		('compra','2025-08-15', 10, 2, 2),
		('venta' ,'2025-08-20',  1, 3, null);

/*
 * Actualiza la cantidad de inventario de un producto después de una venta o compra.
 */
UPDATE productos SET cantidad = cantidad - 5 WHERE id_producto = 3;

/*
 *  Elimina un producto de la base de datos si ya no está disponible.
 */ 
DELETE FROM productos WHERE id_producto = 2 and cantidad = 0;
-- select * from productos;



/*  
 *  --------------------------------------------------------------------
 *  3. Consultas Básicas
 *  --------------------------------------------------------------------
 */

/*
 *  Recupera todos los productos disponibles en el inventario
 */
SELECT * FROM productos WHERE cantidad > 0;

/*
 *  Recupera todos los proveedores que suministran un producto específico
 */
SELECT DISTINCT p.nombre, p.direccion, p.telefono, p.email
FROM proveedores p
JOIN transacciones t ON p.id_proveedor = t.id_proveedor
WHERE t.id_producto = 1;

/*
 *  Consultar las transacciones realizadas en una fecha específica
 */
SELECT * FROM transacciones WHERE fecha = '2025-08-01';

/*
 *  Calcular el número total de productos vendidos
 */
SELECT SUM(cantidad) AS total_vendidos
FROM transacciones
WHERE tipo = 'venta';

/*
 *  Calcular el valor total de compras
 */
SELECT SUM(t.cantidad * pr.precio) AS total_compras
FROM transacciones t
JOIN productos pr ON t.id_producto = pr.id_producto
WHERE t.tipo = 'compra';


/*  
 *  --------------------------------------------------------------------
 *  5. Transacciones SQL
 *  --------------------------------------------------------------------
 */

/*
 *  Muestra las transacciones actuales, antes de efectuar requerimientos
 */
SELECT * FROM transacciones;
-- Existen solo existen 4 transacciones (compra y ventas) registradas, y cantidad del producto 2 es 10

/*
 *  Realiza una nueva transacción para registrar una compra de productos y actualiza la
 *  cantidad del producto 2 de la tabla productos
 */
BEGIN;
    INSERT INTO transacciones (tipo, cantidad, id_producto, id_proveedor)
    VALUES ('compra', 5, 2, 1);
    UPDATE productos SET cantidad = cantidad + 5 WHERE id_producto = 2;
COMMIT;

-- A continuación, se muestran los cmabios registrados 
SELECT * FROM transacciones;
SELECT * FROM productos;

/*
 * Realiza una nueva transacción para registrar una compra de productos y actualiza la
 * cantidad del producto 2 de la tabla productos, pero se efectuará un ROLLBACK para
 * anular las transacciones en las tablas respectivas.
 */

BEGIN;
    INSERT INTO transacciones (tipo, cantidad, id_producto, id_proveedor)
    VALUES ('venta', 100, 3, 1);
    UPDATE productos SET cantidad = cantidad - 10 WHERE id_producto = 2 and cantidad >= 0;
ROLLBACK;

-- A continuación, se muestran los registros sin cambios 
select * from transacciones;
SELECT * FROM productos;


/*  
 *  --------------------------------------------------------------------
 *  6. Consultas Complejas
 *  --------------------------------------------------------------------
 */

/*
 *  Realiza una consulta que recupere el total de ventas de un producto durante el mes
 *  anterior.
 */
SELECT SUM(t.cantidad * p.precio) AS total_ventas_mes_anterior
FROM transacciones t
JOIN productos p ON t.id_producto = p.id_producto
WHERE t.tipo = 'venta'
  AND t.id_producto = 1
  AND DATE_PART('month', t.fecha) = DATE_PART('month', CURRENT_DATE - INTERVAL '1 month')
  AND DATE_PART('year', t.fecha)  = DATE_PART('year', CURRENT_DATE - INTERVAL '1 month');

/*
 *  Utiliza JOINs (INNER, LEFT) para obtener información relacionada entre las tablas
 *  productos, proveedores y transacciones.
 */
SELECT t.id_transaccion, t.tipo, t.fecha, t.cantidad,
       p.nombre AS producto, pr.nombre AS proveedor
FROM transacciones t
JOIN productos p ON t.id_producto = p.id_producto
LEFT JOIN proveedores pr ON t.id_proveedor = pr.id_proveedor;

/*
 *  Implementa una consulta con subconsultas (subqueries) para obtener productos que no
 *  se han vendido durante un período determinado.
 */
SELECT * 
FROM productos
WHERE id_producto NOT IN (
      SELECT id_producto FROM transacciones WHERE tipo = 'venta'
      AND fecha >= CURRENT_DATE - INTERVAL '30 days'
      );




/*  
 *  --------------------------------------------------------------------
 *  Consideraciones con TRY/CATCH en PostgreSQL con DO $$
 *  --------------------------------------------------------------------
 */

/*
 *  Al intentar registrar una venta mayor al stock, lanzará un error.
 *  El bloque captura la excepción y deja la base de datos consistente (no se descuenta
 *  inventario):
 */

-- mostrar registro de las tablas productos y transacciones.
SELECT * FROM productos;
SELECT * FROM transacciones;

DO $$
BEGIN
    BEGIN
        -- Venta mayor al cantidad existente (3), error  por stock insuficiente
        INSERT INTO transacciones (tipo, cantidad, id_producto, id_proveedor)
        VALUES ('venta', 100, 3, NULL);

        -- El producto id_producto = 3 no tiene suficiente stock. 
        -- El UPDATE intenta dejar la columna cantidad en negativo → se activa el CHECK y falla.   
        -- Error al registrar la transacción: el nuevo registro para la relación «productos»
        -- viola la restricción «check» «productos_cantidad_check»
        UPDATE productos
        SET cantidad = cantidad - 25
        WHERE id_producto = 3;

        RAISE NOTICE 'Venta registrada correctamente';
    EXCEPTION WHEN others THEN
        RAISE NOTICE 'Error al registrar la transacción: %', SQLERRM;
    END;
END$$;
rollback;


-