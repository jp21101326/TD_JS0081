-- Areas
INSERT INTO area (nombre, descripcion) VALUES
('RRHH', 'Recursos Humanos'),
('TI'  , 'Tecnologías de la Información'),
('SGDI', 'Oficina de Documentación'),
('DFZA', 'Departamento de Finanzas');

-- Clientes internos
INSERT INTO cliente_interno (nombre, id_area) VALUES
('Departamento RRHH'   , 1),
('Departamento TI'     , 2),
('Registratura'        , 3),
('Sección Contabilidad', 4);

-- Proveedores
INSERT INTO proveedor (nombre, rut, contacto, email) VALUES
('Limpio S.A.'          , '76123456-7' ,'José Fuentes'   , 'contacto@limpio.cl'),
('Computación S.A.'     , '77987654-3' ,'Pedro Sepúlveda', 'conctado@compu.cl'),
('Defontana S.A..'      , '78456123-1' ,'Luis Troncoso'  , 'conctado@defontana.cl'),
('Jardines Verdes Ltda.', '79789890-1' ,'Gonzalo Molina' , 'conctado@jardines.cl');

-- Tipo de servicios
INSERT INTO tipo_servicio (nombre) VALUES
('Aseo'),
('Informática'),
('Contabilidades'),
('Jardinería');

-- Servicios
INSERT INTO servicio (nombre, descripcion, id_tipo_servicio) VALUES
('Aseo Oficina', 'Limpieza general de oficinas'   , 1),
('Arriendo PCs', 'Arriendo de PCs, Notebook'      , 2),
('Auditorias'  , 'Mantenimiento de áreas verdes'  , 3),
('Areas Verdes', 'Mantenimiento de áreas verdes'  , 4);

-- Responsable de contratos
INSERT INTO responsable_contrato (nombre, cargo, email) VALUES
('Alejandro González', 'Coordinador TI'  , 'alejandro.gonzalez@empresa.cl'),
('Irene Silva'       , 'Jefe Finanzas'   , 'irene.silva@empresa.cl'),
('José Cifuentes'    , 'Cooridnador RRHH', 'jose.cifuentes@empresa.cl');

-- Contratos
INSERT INTO contrato (id_cliente, id_proveedor, id_servicio, id_responsable, fecha_inicio, fecha_fin, monto, estado) VALUES
(1, 1, 1, 1, '2025-01-01', '2025-12-31', 1500000, 'Vigente'),
(2, 1, 1, 1, '2025-01-01', '2025-12-31', 2500000, 'Vigente'),
(3, 2, 2, 2, '2025-03-01', '2025-09-30',  800000, 'Vigente');

-- Pagos
INSERT INTO pago_contrato (id_contrato, fecha_pago, monto_pagado, metodo_pago) VALUES
(1, '2025-02-01', 125000, 'Transferencia'),
(2, '2025-03-01', 125000, 'Transferencia'),
(3, '2025-04-15', 200000, 'Cheque');

-- Renovaciones
INSERT INTO renovacion_contrato (id_contrato, fecha_renovacion, nuevo_monto, observaciones) VALUES
(1, '2025-07-01', 1600000, 'Ajuste de tarifas'),
(2, '2025-09-01',  850000, 'Extensión temporal');

-- Facturas
INSERT INTO factura (id_pago, numero_factura, fecha_emision, monto) VALUES
(1, 'FAC-1001', '2025-02-02', 125000),
(2, 'FAC-1002', '2025-03-02', 125000),
(3, 'FAC-2001', '2025-04-16', 200000);
