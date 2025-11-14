#  M7_AE4_ABP - Control de Transacciones en PostgreSQL con Node.js

##  Descripción
Este proyecto implementa un flujo transaccional en **Node.js** utilizando **PostgreSQL** y el paquete `pg`.  
Simula el proceso de una compra en una tienda, aplicando los principios de **atomicidad, integridad y manejo de errores** mediante el uso de `BEGIN`, `COMMIT` y `ROLLBACK`.

---

##  Tecnologías utilizadas
- Node.js  
- PostgreSQL  
- Librería `pg`  
- Módulo `dotenv` para variables de entorno  
- Sistema de logs con `fs/promises`

---

##  Estructura del proyecto
```
📦 proyecto
 ┣ 📂 db
 ┃ ┗ 📜 pool.js
 ┣ 📂 models
 ┃ ┗ 📜 tienda.js
 ┣ 📜 server.js
 ┣ 📜 create_tables.sql
 ┣ 📜 .env
 ┗ 📜 logs.json
```

---

##  Funcionalidad principal

El flujo simula una compra con las siguientes operaciones dentro de **una transacción**:

1. Crear un nuevo cliente.  
2. Verificar existencia del producto.  
3. Validar el stock disponible.  
4. Crear un nuevo pedido.  
5. Actualizar el inventario restando las unidades pedidas.  
6. Confirmar (`COMMIT`) o revertir (`ROLLBACK`) según el resultado.

En caso de error (como producto inexistente o stock insuficiente), la transacción se **revierte completamente**.

---

##  Base de datos

El archivo [`create_tables.sql`](./create_tables.sql) crea las tablas necesarias:

- **clientes**
- **productos**
- **pedidos**

y carga algunos productos de ejemplo:

```sql
INSERT INTO productos (nombre, stock) VALUES
('Teclado Mecánico', 10),
('Mouse Óptico', 25),
('Monitor 24"', 5);
```

---

##  Configuración

Crea un archivo `.env` con tus credenciales:

```env
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_NAME=db_tienda
```

Ejecuta las tablas iniciales:
```bash
psql -U tu_usuario -d postgres -f create_tables.sql
```

Instala las dependencias:
```bash
npm install pg dotenv
```

---

##  Ejecución

Ejecuta el archivo principal:

```bash
node server.js
```

Verás en consola la simulación de tres escenarios:
1. Compra exitosa  
2. Error por stock insuficiente  
3. Error por producto inexistente (para probar rollback)

Los errores no controlados se guardan en `logs.json`.

---

##  Ejemplo de salida en consola

```
Iniciando transacción...
Cliente creado: { id: 1, nombre: 'Ana Torres', ... }
Producto encontrado: { id: 1, nombre: 'Teclado Mecánico', stock: 10 }
Pedido registrado: { id: 1, cliente_id: 1, ... }
Transacción completada con éxito (COMMIT).
Cliente liberado del pool.

Iniciando transacción...
Transacción revertida (ROLLBACK): Stock insuficiente: disponible 5, solicitado 9999
Cliente liberado del pool.
```

---

##  Conceptos aplicados

- **Atomicidad:** Todas las operaciones se ejecutan como una unidad indivisible.  
- **Consistencia:** La base de datos mantiene su integridad incluso ante errores.  
- **Aislamiento:** Las transacciones no interfieren entre sí.  
- **Durabilidad:** Los cambios confirmados con `COMMIT` permanecen almacenados.

---

