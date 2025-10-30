# M7_Evaluación de portafolio - Proyecto Tienda Online

Este proyecto implementa una **aplicación Node.js con Express y Sequelize** para la gestión de **usuarios y pedidos** en una tienda en línea.  
En esta versión **no se utiliza el método `transaction` de Sequelize**, por lo que las operaciones de creación de pedidos se ejecutan directamente sin transacciones.

---

## Contexto

El propósito del proyecto es aplicar conocimientos sobre la integración de Node.js con PostgreSQL utilizando **Sequelize como ORM**, implementando operaciones CRUD y relaciones entre entidades sin emplear transacciones explícitas.

---

## Características principales

- Conexión a **PostgreSQL** mediante Sequelize.
- Modelos **Usuario** y **Pedido** con relación *uno a muchos*.
- CRUD completo para usuarios y pedidos.
- Validaciones de datos (email y contraseña).
- Manejo centralizado de errores.
- Uso de **variables de entorno** (.env) para credenciales y configuración.

---

## Estructura del proyecto

```
├─ tienda-online/
│  ├─ config/db.js
│  ├─ models/
│  │  ├─ index.js
│  │  ├─ usuario.js
│  │  └─ pedido.js
│  ├─ controllers/
│  │  ├─ usuario.controller.js
│  │  └─ pedido.controller.js
│  ├─ routes/
│  │  ├─ usuarios.routes.js
│  │  └─ pedidos.routes.js
│  ├─ middlewares/
│  │  └─ errorHandler.js
│  ├─ public/
│  │  └─ index.html
│  └─ server.js
├─ .env.example
├─ package.json
└─ README.md
```

---

## Instalación y configuración

### 1. Instalar dependencias

```bash
npm install sequelize pg pg-hstore
npm install -g nodemon
```

### Proteger las contraseñas de los usuarios
```bash
npm install bcrypt 
```

### 2. Configurar el archivo `.env`

Ejemplo de configuración:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tienda_online
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_DIALECT=postgres
PORT=3000
```

### 3. Crear base de datos

```sql
CREATE DATABASE tienda_online;
```

---

## Ejecución

### En modo desarrollo (con recarga automática)
```bash
npm run dev
```

### En modo producción
```bash
npm start
```

Servidor disponible en:  
**http://localhost:3000**

---

## Endpoints principales

### Usuarios
| Método | Ruta            | Descripción                |
|--------|-----------------|----------------------------|
| POST   | `/usuarios`     | Crear un nuevo usuario     |
| GET    | `/usuarios`     | Listar todos los usuarios  |
| GET    | `/usuarios/:id` | Obtener un usuario por ID  |
| PUT    | `/usuarios/:id` | Actualizar un usuario      |
| DELETE | `/usuarios/:id` | Eliminar un usuario        |


### Pedidos
| Método | Ruta                          | Descripción                   |
|--------|-------------------------------|-------------------------------|
| POST   | `/pedidos`                    | Crear un pedido               |
| GET    | `/usuario/:usuarioId/pedidos` | Obtener pedidos de un usuario |

---

---

## Validaciones incluidas

- **Email:** formato válido y único.  
- **Contraseña:** mínimo 6 caracteres.  
- **Cantidad:** debe ser mayor o igual a 1.  
- **Relación:** los pedidos deben pertenecer a un usuario existente.

---

## Pruebas de Uso - POSTMAN

### Crear Usuario

**POST:** `http://localhost:3000/usuarios`

**Body → raw → JSON**
```json
{
  "nombre": "Luis Corona",
  "email": "lcorona@gmail.com",
  "contraseña": "123456"
}
```

---

### Listar Usuarios

**GET:** `http://localhost:3000/usuarios`

**Ejemplo de respuesta**
```json
[
  {
    "id": 1,
    "nombre": "Luis Corona",
    "email": "lcorona@gmail.com",
    "contraseña": "$2b$10$QpT1zdscuR4ALMtMykPnauDtfqS/ov.BMuDjczRG6fwSrpfXigq5u",
    "createdAt": "2025-10-30T17:30:36.733Z",
    "updatedAt": "2025-10-30T17:30:36.733Z",
    "pedidos": []
  }
]
```

---

### Crear Pedido

**POST:** `http://localhost:3000/pedidos`

**Body → raw → JSON**
```json
{
  "usuarioId": 1,
  "producto": "Disco externo SSD",
  "cantidad": 1
}
```

---

### Obtener Pedidos de un Usuario

**GET:** `http://localhost:3000/usuarios/1/pedidos`

**Ejemplo de respuesta**
```json
[
  {
    "id": 1,
    "producto": "Disco externo 33",
    "cantidad": 1,
    "fecha_pedido": "2025-10-30T17:31:13.273Z",
    "createdAt": "2025-10-30T17:31:13.273Z",
    "updatedAt": "2025-10-30T17:31:13.273Z",
    "usuarioId": 1
  }
]
```

---

### Visualizar pedidos desde /usuarios

**GET:** `http://localhost:3000/usuarios`

**Ejemplo de respuesta**
```json
[
  {
    "id": 1,
    "nombre": "Rodrigo Corona",
    "email": "rcorona@gmail.com",
    "contraseña": "$2b$10$QpT1zdscuR4ALMtMykPnauDtfqS/ov.BMuDjczRG6fwSrpfXigq5u",
    "createdAt": "2025-10-30T17:30:36.733Z",
    "updatedAt": "2025-10-30T17:30:36.733Z",
    "pedidos": [
      {
        "id": 1,
        "producto": "Disco externo 33",
        "cantidad": 1,
        "fecha_pedido": "2025-10-30T17:31:13.273Z",
        "createdAt": "2025-10-30T17:31:13.273Z",
        "updatedAt": "2025-10-30T17:31:13.273Z",
        "usuarioId": 1
      }
    ]
  }
]
```

---

### Otra forma para ejecutar las operaciones desde Html
# Carpeta Public - Index.html
**URL:** `http://localhost:3000/index.html`

Aplicación que permite realizar las operaciones:
- Crear, actualizar, listar y elimianar usuario
- Crear Pedidos
- listar usuario pedido

---
## Pruebas sugeridas

| Escenario                             | Resultado esperado                    |
|---------------------------------------|---------------------------------------|
| Crear usuario con email inválido      | Error 400                             |
| Crear usuario con contraseña corta    | Error 400                             |
| Crear pedido con usuario inexistente  | Error 404                             |
| Crear pedido válido                   | Éxito 201                             |
| Eliminar usuario                      | También elimina sus pedidos (CASCADE) |

---

## Tecnologías utilizadas

- Node.js  
- Express.js  
- Sequelize ORM  
- PostgreSQL  
- Bcrypt  
- Dotenv  
- Nodemon
