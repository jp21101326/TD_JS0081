
-- Creación de Base de Datos
CREATE DATABASE GestionContratos;

-- Tablas principales existentes
CREATE TABLE area (
    id_area     SERIAL PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL,
    descripcion VARCHAR(60) 
);

CREATE TABLE cliente_interno (
    id_cliente   SERIAL PRIMARY KEY,
    nombre       VARCHAR(60)  NOT NULL,
    id_area      INT REFERENCES area(id_area)
);

CREATE TABLE proveedor (
    id_proveedor SERIAL PRIMARY KEY,
    nombre       VARCHAR(60) NOT NULL,
    rut          VARCHAR(10) UNIQUE NOT NULL,
    contacto     VARCHAR(60),
    email        VARCHAR(60)
);

CREATE TABLE tipo_servicio (
    id_tipo_servicio SERIAL PRIMARY KEY,
    nombre           VARCHAR(100) NOT NULL
);

CREATE TABLE servicio (
    id_servicio      SERIAL PRIMARY KEY,
    nombre           TEXT NOT NULL,
    descripcion      TEXT,
    id_tipo_servicio INT REFERENCES tipo_servicio(id_tipo_servicio)
);

CREATE TABLE responsable_contrato (
    id_responsable  SERIAL PRIMARY KEY,
    nombre          VARCHAR(60) NOT NULL,
    cargo           VARCHAR(100),
    email           VARCHAR(60)
);

CREATE TABLE contrato (
    id_contrato		 SERIAL PRIMARY KEY,
    id_cliente   	 INT REFERENCES cliente_interno(id_cliente),
    id_proveedor     INT REFERENCES proveedor(id_proveedor),
    id_servicio      INT REFERENCES servicio(id_servicio),
    id_responsable   INT REFERENCES responsable_contrato(id_responsable),
    fecha_inicio     DATE NOT NULL,
    fecha_fin        DATE NOT NULL,
    monto            NUMERIC(12,2) NOT NULL,
    estado           TEXT NOT NULL CHECK (estado IN ('Vigente','Finalizado','Suspendido'))
);

CREATE TABLE pago_contrato (
    id_pago      SERIAL PRIMARY KEY,
    id_contrato  INT REFERENCES contrato(id_contrato),
    fecha_pago   DATE NOT NULL,
    monto_pagado NUMERIC(12,2) NOT NULL,
    metodo_pago  TEXT
);

CREATE TABLE renovacion_contrato (
    id_renovacion    SERIAL PRIMARY KEY,
    id_contrato      INT REFERENCES contrato(id_contrato),
    fecha_renovacion DATE NOT NULL,
    nuevo_monto      NUMERIC(12,2),
    observaciones    TEXT
);

CREATE TABLE factura (
    id_factura SERIAL PRIMARY KEY,
    id_pago           INT REFERENCES pago_contrato(id_pago),
    numero_factura    VARCHAR(50) UNIQUE NOT NULL,
    fecha_emision     DATE NOT NULL,
    monto             NUMERIC(12,2) NOT NULL
);
