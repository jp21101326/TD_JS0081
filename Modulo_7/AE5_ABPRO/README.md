# AE5 - Gestión de Productos con Sequelize y PostgreSQL

## Descripción

Este proyecto es un ejercicio práctico para **aprender a crear clases en JavaScript** y **usar Sequelize como ORM** para manejar una base de datos PostgreSQL. Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre productos dentro de un sistema de gestión de inventarios.

---

## Estructura del proyecto

```
AE5/
│
├── server.js                 
├── config/
│   └── db.js                  
├── clases/
│   └── producto.js            
├── controllers/
│   └── producto.controllers.js 
└── models/
    └── producto.js            
```

---

## Tecnologías utilizadas

- Node.js
- Sequelize (ORM)
- PostgreSQL
- JavaScript ES6 (Clases)
- Consola para pruebas

---

## Requisitos previos

- Tener instalado **Node.js** y **npm**
- Tener instalado **PostgreSQL** y crear la base de datos `inventario`
- Conocer las credenciales de acceso a PostgreSQL (usuario, contraseña, puerto)

---

## Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Configurar la conexión a PostgreSQL en `config/db.js`:

```js
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);
```

3. Crear la base de datos `inventario` en PostgreSQL:

```sql
CREATE DATABASE inventario;
```

---

## Uso

1. Ejecutar el servidor de pruebas:

```bash
node server.js
```

2. El script realizará automáticamente:

- Sincronización de la base de datos
- Creación de un producto de prueba
- Lectura de todos los productos
- Búsqueda por ID
- Actualización de un producto
- Eliminación de un producto

---

## Explicación de la implementación

1. **Clase Producto**  
   - Se definió utilizando **declaración de clase** y **expresión de clase**.  
   - Incluye **constructor**, **getters**, **setters** y un método `mostrarInfo()`.

2. **Modelo Sequelize**  
   - Representa la tabla `Productos` en PostgreSQL.  
   - Atributos: `id`, `nombre`, `descripcion`, `precio`, `cantidad`.  
   - Tipos de datos elegidos: `INTEGER` para números y `STRING` para textos.

3. **Controlador CRUD**  
   - `createProducto`: Crea un producto.  
   - `getAllProductos`: Obtiene todos los productos.  
   - `getProductoById`: Obtiene un producto por ID.  
   - `updateProducto`: Actualiza un producto.  
   - `deleteProducto`: Elimina un producto.  
   - Incluye manejo básico de errores si un producto no existe.

4. **Servidor principal (`server.js`)**  
   - Invoca todas las operaciones CRUD para pruebas en consola.  
   - Sincroniza la base de datos automáticamente.

---

## Conceptos teóricos

1. **ORM (Object Relational Mapping)**  
   Permite interactuar con bases de datos relacionales usando objetos de programación en lugar de SQL manual.

2. **Modelo en Sequelize**  
   Representa una tabla en la base de datos y cada instancia es un registro.

3. **Relaciones entre modelos**  
   Permiten definir vínculos entre tablas: uno a muchos (`hasMany/belongsTo`) o muchos a muchos (`belongsToMany`).

---

## Resultados esperados

Al ejecutar `node server.js`:

- Crear producto de prueba
- Mostrar todos los productos
- Mostrar producto por ID
- Actualizar producto
- Eliminar producto

---

## Resultados ejecución

node server.js

Conexión a la base de datos PostgreSQL exitosa.
Base de datos sincronizada correctamente.

Creación Producto'
================================
Producto creado: {
  id: 3,
  nombre: 'Monitor Samsung',
  descripcion: 'Monitor LED 27" Full HD',
  precio: 180000,
  cantidad: 15,
  updatedAt: 2025-10-22T00:13:34.405Z,   
  createdAt: 2025-10-22T00:13:34.405Z    
}

Listado de Productos
================================
[
  {
    id: 1,
    nombre: 'Monitor LG',
    descripcion: 'Monitor LED 32" QHD',
    precio: 230000,
    cantidad: 40,
    createdAt: 2025-10-22T00:13:34.391Z,
    updatedAt: 2025-10-22T00:13:34.391Z
  },
  {
    id: 2,
    nombre: 'Monitor Asus',
    descripcion: 'Monitor OLED 50" UHD',
    precio: 500000,
    cantidad: 5,
    createdAt: 2025-10-22T00:13:34.402Z,
    updatedAt: 2025-10-22T00:13:34.402Z
  },
  {
    id: 3,
    nombre: 'Monitor Samsung',
    descripcion: 'Monitor LED 27" Full HD',
    precio: 180000,
    cantidad: 15,
    createdAt: 2025-10-22T00:13:34.405Z,
    updatedAt: 2025-10-22T00:13:34.405Z
  }
]

Buscar Producto Id(1)
================================
{
  id: 1,
  nombre: 'Monitor LG',
  descripcion: 'Monitor LED 32" QHD',
  precio: 230000,
  cantidad: 40,
  createdAt: 2025-10-22T00:13:34.391Z,
  updatedAt: 2025-10-22T00:13:34.391Z
}

Producto Actualizado:
================================
Filas Actualizadas:  1
{
  id: 1,
  nombre: 'Monitor LG',
  descripcion: 'Monitor LED 32" QHD',
  precio: 200000,
  cantidad: 20,
  createdAt: 2025-10-22T00:13:34.391Z,
  updatedAt: 2025-10-22T00:13:34.443Z
}

Producto Eliminado:'
================================
Filas Eliminadas:  1
{
  id: 2,
  nombre: 'Monitor Asus',
  descripcion: 'Monitor OLED 50" UHD',
  precio: 500000,
  cantidad: 5,
  createdAt: 2025-10-22T00:13:34.402Z,
  updatedAt: 2025-10-22T00:13:34.402Z
}

