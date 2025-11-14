-- Consultas básicas
SELECT c.id_cliente, ci.nombre AS cliente, p.nombre AS proveedor, s.nombre AS servicio, c.fecha_inicio, c.fecha_fin, c.monto
FROM contrato c
JOIN cliente_interno ci ON ci.id_cliente = c.id_cliente
JOIN proveedor p ON p.id_proveedor = c.id_proveedor
JOIN servicio s ON s.id_servicio = c.id_servicio
WHERE c.estado = 'Vigente';


-- Actualizar contacto de un proveedor 
UPDATE proveedor SET contacto = 'José Cifuentes', email='jcifuentes@limpio.cl' WHERE id_proveedor=1;

-- Eliminar registro 3 de la tabla area 
DELETE  area WHERE id_rea =3;

-- Tambien se puede efectuar en cascada para ello debemos es definir las foreign keys con ON DELETE CASCADE.
-- Eso asegura que cuando borras en la tabla padre, los registros hijos se eliminen automáticamente.
ALTER TABLE cliente_interno
DROP CONSTRAINT IF EXISTS fk_area_cliente,
ADD CONSTRAINT fk_area_cliente
    FOREIGN KEY (area_id) REFERENCES area(id)
    ON DELETE CASCADE;



-- Consulta: Total pagado por proveedor con detalle de facturas
SELECT p.nombre AS proveedor,
       COUNT(DISTINCT c.id_contrato) AS cantidad_contratos,
       SUM(pc.monto_pagado) AS total_pagado,
       COUNT(DISTINCT f.id_factura) AS facturas_emitidas
FROM proveedor p
JOIN contrato c       ON c.id_proveedor = p.id_proveedor
JOIN pago_contrato pc ON pc.id_contrato = c.id_contrato
LEFT JOIN factura f   ON f.id_pago = pc.id_pago
WHERE c.estado = 'Vigente'
GROUP BY p.nombre
ORDER BY total_pagado DESC;


-- Consultar total pagado por contrato
CREATE OR REPLACE FUNCTION fn_total_pagado_contrato(cid INT)
RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC;
BEGIN
    SELECT SUM(monto_pagado) INTO total FROM pago_contrato WHERE id_contrato = cid;
    RETURN COALESCE(total,0);
END;
$$ LANGUAGE plpgsql;



-- Consultar total pagado por contrato
CREATE OR REPLACE FUNCTION fn_total_pagado_contrato(cid INT)
RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC;
BEGIN
    SELECT SUM(monto_pagado) INTO total FROM pago_contrato WHERE id_contrato = cid;
    RETURN COALESCE(total,0);
END;
$$ LANGUAGE plpgsql;

-- Invocar function:
SELECT fn_total_pagado_contrato(1) AS total_pagado;



-- Procedimiento para listar contratos de un área
CREATE OR REPLACE PROCEDURE sp_contratos_area(aid INT)
LANGUAGE plpgsql
AS $$
DECLARE
    rec RECORD;
BEGIN
    RAISE NOTICE 'Contratos vigentes del área %:', aid;
    
    FOR rec IN
        SELECT c.id_contrato AS contrato,
               ci.nombre     AS cliente,
               s.nombre      AS servicio,
               c.monto
        FROM contrato c
        JOIN cliente_interno ci ON ci.id_cliente = c.id_cliente
        JOIN servicio s         ON s.id_servicio = c.id_servicio
        WHERE ci.id_area = aid AND c.estado = 'Vigente'
    LOOP
        RAISE NOTICE 'Contrato % - Cliente: %, Servicio: %, Monto: %',
                     rec.contrato, rec.cliente, rec.servicio, rec.monto;
    END LOOP;
END;
$$;


-- llamado procedimiento:
CALL sp_contratos_area(2);


-- Listado de contratos con pagos y facturas:
SELECT c.id_contrato AS contrato, ci.nombre AS cliente, p.nombre AS proveedor, f.numero_factura, pc.monto_pagado
FROM contrato c
JOIN cliente_interno ci ON ci.id_cliente  = c.id_cliente
JOIN proveedor p        ON p.id_proveedor = c.id_proveedor
JOIN pago_contrato pc   ON pc.id_contrato = c.id_contrato
JOIN factura f          ON f.id_pago      = pc.id_pago;




