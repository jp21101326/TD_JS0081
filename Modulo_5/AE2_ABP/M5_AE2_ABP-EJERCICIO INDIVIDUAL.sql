/*
-- Crear tabla empleados con los siguientes atributos
*/
	CREATE TABLE empleados (
		id int NOT NULL,
		nombre varchar NOT NULL,
		departamento varchar NOT NULL,
		salario int DEFAULT 0 NOT NULL,
		CONSTRAINT empleados_pk PRIMARY KEY (id)
	);

/*
-- Insertar registros
*/
	INSERT INTO empleados (id, nombre, departamento, salario) VALUES
	(1, 'Ana García', 'Recursos Humanos', 32000),
	(2, 'Luis Pérez', 'Marketing', 35000),
	(3, 'Carlos Díaz', 'Ventas', 27000),
	(4, 'María López', 'Contabilidad', 40000),
	(5, 'Pedro Martínez', 'Desarrollo', 45000),
	(6, 'Julia Fernández', 'Recursos Humanos', 31000),
	(7, 'Juan Rodríguez', 'Marketing', 38000),
	(8, 'Elena Sánchez', 'Ventas', 26000),
	(9, 'David González', 'Contabilidad', 42000),
	(10, 'Raquel Pérez', 'Desarrollo', 46000),
	(11, 'Fernando García', 'Recursos Humanos', 33000),
	(12, 'Isabel Ruiz', 'Marketing', 36000),
	(13, 'Sergio Gómez', 'Ventas', 28000),
	(14, 'Carmen Romero', 'Contabilidad', 39000),
	(15, 'José Torres', 'Desarrollo', 48000);

/*
-- 1. Actualiza el salario del empleado con ID=3 a 30000
*/
	UPDATE empleados
	SET salario = 30000
	WHERE id = 3;

   -- select * from empleados where Id=3

/*
-- 2. Proyecta todos los empleados que trabajen en el departamento de ‘Ventas’
*/
	SELECT *
	FROM empleados
	WHERE departamento = 'Ventas';

/*
-- 3. Calcula el salario promedio para cada departamento
*/
	SELECT departamento, ROUND(AVG(salario),2) AS salario_promedio
	FROM empleados
	GROUP BY departamento;

/*
-- 4. Proyecta solo los nombres de todos los departamentos (sin repetir)
*/
	SELECT DISTINCT departamento
	FROM empleados;

/*
-- 5. Proyecta los dos empleados con los salarios más bajos, ordenados de forma ascendente por salario
*/
	SELECT *
	FROM empleados
	ORDER BY salario ASC
	LIMIT 2;



