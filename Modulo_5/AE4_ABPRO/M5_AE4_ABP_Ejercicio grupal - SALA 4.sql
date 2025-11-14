
/*--------------------------------------------------------
 * 1. Crear la base de datos
 *--------------------------------------------------------
 */
	CREATE DATABASE libreria_db;
    -- drop database libreria_db;

-- Conectarse manualmente a la base de datos 
-- libreria_db;

/*--------------------------------------------------------
 * 2. Definir y crear las tablas con los siguientes campos:
 * --------------------------------------------------------
 */
	CREATE TABLE clientes (
	    id_cliente        SERIAL       PRIMARY KEY,
	    nombre_cliente    VARCHAR(100) NOT NULL,
	    correo_cliente    VARCHAR(100) UNIQUE NOT NULL,
	    telefono_cliente  VARCHAR(15)  NOT NULL CHECK (telefono_cliente ~ '^[0-9]{10}$'),
	    direccion_cliente VARCHAR(255) NOT NULL
	);

	CREATE TABLE libros (
	    id_libro            SERIAL        PRIMARY KEY,
	    titulo_libro        VARCHAR(255)  NOT NULL,
	    autor_libro         VARCHAR(100)  NOT NULL,
	    precio_libro        DECIMAL(10,2) NOT NULL,
	    cantidad_disponible INT           NOT NULL CHECK (cantidad_disponible >= 0),
	    categoria_libro     VARCHAR(50)   NOT NULL
	);

	CREATE TABLE pedidos (
	    id_pedido     SERIAL        PRIMARY KEY,
	    id_cliente    INT           NOT NULL,
	    fecha_pedido  DATE          NOT NULL,
	    total_pedido  DECIMAL(10,2) NOT NULL,
	    estado_pedido VARCHAR(50)   NOT NULL,
	    CONSTRAINT fk_pedidos_clientes FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE CASCADE
	);

	CREATE TABLE detalles_pedido (
	    id_detalle     SERIAL        PRIMARY KEY,
	    id_pedido      INT           NOT NULL,
	    id_libro       INT           NOT NULL,
	    cantidad_libro INT           NOT NULL,
	    precio_libro   DECIMAL(10,2) NOT NULL,
	    CONSTRAINT fk_detalles_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
	    CONSTRAINT fk_detalles_libro  FOREIGN KEY (id_libro)  REFERENCES libros(id_libro)   ON DELETE CASCADE
	);

	CREATE TABLE pagos (
	    id_pago     SERIAL        PRIMARY KEY,
	    id_pedido   INT           NOT NULL,
	    fecha_pago  DATE          NOT NULL,
	    monto_pago  DECIMAL(10,2) NOT NULL,
	    metodo_pago VARCHAR(50)   NOT NULL,
	    CONSTRAINT fk_pagos_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE
	);

	
/*--------------------------------------------------------
 *  4.	Modificaciones a realizar en la base de datos:
 * -------------------------------------------------------
 */
	-- Cambiar el tipo de dato de telefono_cliente a VARCHAR(20) para permitir más
    -- flexibilidad en la entrada de números internacionales
	ALTER TABLE clientes
	ALTER COLUMN telefono_cliente TYPE VARCHAR(20);

	-- Modificar el campo precio_libro en Libros para que acepte un valor con hasta
    -- 3 decimales (decimales(10,3)) en lugar de dos.
	ALTER TABLE libros
	ALTER COLUMN precio_libro TYPE DECIMAL(10,3);

	-- Actualizar la tabla Pagos para incluir un nuevo campo fecha_confirmacion que
    -- registre cuándo se confirma el pago.
	ALTER TABLE pagos
	ADD COLUMN fecha_confirmacion DATE;

	-- Eliminar la tabla Detalles_Pedido y sus registros cuando se haya confirmado
    -- la entrega de todos los libros de un pedido.	
	
	DELETE FROM detalles_pedido dp
	USING pedidos p
	WHERE dp.id_pedido = p.id_pedido
	  AND p.estado_pedido = 'Entregado';

	DO $$
	BEGIN
        IF (SELECT COUNT(*) FROM detalles_pedido) = 0 THEN
	        EXECUTE 'DROP TABLE detalles_pedido;';
	        RAISE NOTICE 'Tabla "detalles_pedido" eliminada porque no tenía registros.';
	    ELSE
	        RAISE NOTICE 'La tabla "detalles_pedido" tiene registros, no se eliminará.';
	    END IF;
	END $$;


/* -----------------------------
 *  5. Eliminar una tabla
 * -----------------------------
 */
	-- Después de realizar los cambios en la estructura de la base de datos, eliminar
    -- la tabla Pagos.
	DROP TABLE IF EXISTS pagos;


/* --------------------------------------------------------
 *  6. Truncar una tabla
 * --------------------------------------------------------
 */
	-- Truncar la tabla Pedidos para eliminar todos los registros de pedidos.
    -- Asegurarse de que esto no afecte la integridad referencial.
       TRUNCATE TABLE pedidos RESTART identity CASCADE;




/*--------------------------------------------------------------------------*/
/*
 * Opción Creando tablas y luego Restricciones y reglas a seguir:
 */
/*--------------------------------------------------------------------------*/

/*--------------------------------------------------------
 * 2. Definir y crear las tablas con los siguientes campos:
 * --------------------------------------------------------
 */
	CREATE TABLE clientes (
	    id_cliente		    SERIAL PRIMARY KEY,
	    nombre_cliente		VARCHAR(100) NOT NULL,
	    correo_cliente		VARCHAR(100) NOT NULL,
	    telefono_cliente	VARCHAR(15)   NOT NULL,
	    direccion_cliente	VARCHAR(255) NOT NULL
	);
	
	CREATE TABLE libros (
	    id_libro		    SERIAL     PRIMARY KEY,
	    titulo_libro		VARCHAR(255) NOT NULL,
	    autor_libro		    VARCHAR(100) NOT NULL,
	    precio_libro		DECIMAL(10,2) NOT NULL,
	    cantidad_disponible	INT NOT NULL,
	    categoria_libro		VARCHAR(50) NOT NULL
	);

	CREATE TABLE pedidos (
	    id_pedido		    SERIAL PRIMARY KEY,
	    id_cliente		    INT NOT NULL,
	    fecha_pedido		DATE NOT NULL,
	    total_pedido		DECIMAL(10,2) NOT NULL,
	    estado_pedido		VARCHAR(50) NOT NULL
	);
	
	CREATE TABLE detalles_pedido (
	    id_detalle		   SERIAL PRIMARY KEY,
	    id_pedido		   INT NOT NULL,
	    id_libro		   INT NOT NULL,
	    cantidad_libro	   INT NOT NULL,
	    precio_libro	   DECIMAL(10,2) NOT NULL
	);
	
	CREATE TABLE pagos (
	    id_pago		      SERIAL PRIMARY KEY,
	    id_pedido		  INT NOT NULL,
	    fecha_pago		  DATE NOT NULL,
	    monto_pago		  DECIMAL(10,2) NOT NULL,
	    metodo_pago		  VARCHAR(50) NOT NULL
	);

/* --------------------------------------------------------
 *  3. Restricciones y reglas a seguir
 * --------------------------------------------------------
 */
    -- El campo telefono_cliente debe permitir solo valores numéricos de 10 dígitos.
	ALTER TABLE    clientes
	ADD CONSTRAINT chk_telefono CHECK (telefono_cliente ~ '^[0-9]{10}$');
	
	-- El campo correo_cliente debe ser único y no puede ser nulo.
	ALTER TABLE clientes
	ALTER COLUMN   correo_cliente SET NOT NULL,
	ADD CONSTRAINT unq_correo UNIQUE (correo_cliente);
	
	-- El campo cantidad_disponible en la tabla Libros no puede ser negativo.
	ALTER TABLE    libros
	ADD CONSTRAINT chk_cantidad_libros CHECK (cantidad_disponible >= 0);
	
	-- pedidos deben tener cliente válido
	ALTER TABLE    pedidos
	ALTER COLUMN   id_cliente SET NOT NULL,
	ADD CONSTRAINT fk_pedido_cliente FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente) ON DELETE CASCADE;
	
	-- Cada pedido debe estar asociado a un solo cliente y cada detalle de pedido debe referirse a un solo libro.
	ALTER TABLE    detalles_pedido
	ALTER COLUMN   id_pedido SET NOT NULL,
	ALTER COLUMN   id_libro  SET NOT NULL,
	ADD CONSTRAINT fk_detalles_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
	ADD CONSTRAINT fk_detalles_libro  FOREIGN KEY (id_libro)  REFERENCES libros(id_libro)   ON DELETE CASCADE;
	
	-- pagos deben estar asociados a un pedido
	ALTER TABLE    pagos
	ALTER COLUMN   id_pedido SET NOT NULL,
	ADD CONSTRAINT fk_pagos_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE;



	
