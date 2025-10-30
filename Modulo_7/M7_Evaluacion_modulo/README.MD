# M7_Evaluación de Módulo - Proyecto Usuarios y Roles

Este proyecto implementa una **API REST con Node.js, Express y Sequelize** para la gestión de **usuarios y roles**, incluyendo operaciones CRUD completas, asignación de roles a usuarios y validaciones con middlewares.

---

## Descripción General

El objetivo del proyecto es demostrar el uso de **Sequelize** como ORM para conectar Node.js con **PostgreSQL**, aplicando relaciones **muchos a muchos (N:M)**, validaciones, manejo de errores y buenas prácticas de arquitectura de software.

---

## Estructura del Proyecto

```
usuarios-roles/
├─ src/
│  ├─ config/
│  │  └─ db.js
│  ├─ models/
│  │  ├─ usuario.js
│  │  ├─ rol.js
│  │  └─ tables.js
│  ├─ controllers/
│  │  ├─ usuario.controllers.js
│  │  └─ rol.controllers.js
│  ├─ routes/
│  │  ├─ usuario.routes.js
│  │  └─ rol.routes.js
│  ├─ middlewares/
│  │  ├─ errorHandler.js
│  │  └─ validateFields.js
│  ├─ seeders/
│  │  ├─ rol.seeder.js
│  │  └─ usuario.seeder.js
│  └─ server.js
├─ .env.example
├─ package.json
└─ README.md
```

---

## Instalación y Configuración

### 1 Instalar dependencias
```bash
npm install sequelize pg pg-hstore.
```

### 2 Crear el archivo `.env`
Ejemplo de configuración:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=usuarios_roles
DB_USER=postgres
DB_PASSWORD=tu_password
DB_DIALECT=postgres
PORT=3000
```

### 3 Crear la base de datos
```sql
CREATE DATABASE usuarios_roles;
```

### 4 Ejecutar la aplicación
```bash
npm start
node server.js
```
o en modo desarrollo:
```bash
npm run dev
```

El servidor se iniciará en:  
**http://localhost:3000**

---

## Endpoints Principales
### Usuarios

| Método | Ruta                  | Descripción                |
|--------|-----------------------|----------------------------|
| POST   | `/usuarios`           | Crear un nuevo usuario     |
| GET    | `/usuarios`           | Listar todos los usuarios  |
| GET    | `/usuarios/:id`       | Obtener un usuario por ID  |
| PUT    | `/usuarios/:id`       | Actualizar un usuario      |
| DELETE | `/usuarios/:id`       | Eliminar un usuario        |
| POST   | `/usuarios/:id/roles` | Asignar roles a un usuario |
| DELETE | `/usuarios/:id/roles` | Quitar roles de un usuario |

### Roles

| Método | Ruta         | Descripción            |
|--------|--------------|------------------------|
| POST   | `/roles`     | Crear un nuevo rol     |
| GET    | `/roles`     | Listar todos los roles |
| GET    | `/roles/:id` | Obtener un rol por ID  |
| PUT    | `/roles/:id` | Actualizar un rol      |
| DELETE | `/roles/:id` | Eliminar un rol        |

---

## Ejemplos de uso
### Crear un usuario
```
POST /usuarios
Content-Type: application/json

{
  "nombre": "María López",
  "correo": "maria@mail.com",
  "contraseña": "segura123"
}
```

### Crear un rol
```
POST /roles
Content-Type: application/json

{
  "nombre": "Editor"
}
```

### Asignar roles a un usuario
```
POST /usuarios/1/roles
Content-Type: application/json

{
  "roles": [1, 2]
}
```

---

## Middlewares implementados

### `validateFields.js`
- Verifica que los campos obligatorios (como `nombre`, `correo`, `contraseña`) estén presentes.
- Evita peticiones incompletas y mejora la validación del lado servidor.

### `errorHandler.js`
- Maneja todos los errores de forma centralizada.
- Devuelve respuestas JSON coherentes ante errores de validación o de base de datos.

---

## Validaciones de Modelos
### Usuario
- `correo` debe ser único y con formato válido.
- `contraseña` debe tener al menos 6 caracteres.
- `nombre` no puede estar vacío.

### Rol
- `nombre` es obligatorio y único.

---

## Relaciones

Relación **muchos a muchos (N:M)** entre `Usuario` y `Rol` mediante la tabla intermedia `UsuarioRol`:

```js
Usuario.belongsToMany(Rol, { through: 'UsuarioRol', as: 'roles', foreignKey: 'usuarioId' });
Rol.belongsToMany(Usuario, { through: 'UsuarioRol', as: 'usuarios', foreignKey: 'rolId' });
```

---

## Seeders incluidos

### `rol.seeder.js`
Crea roles iniciales:
```js
Admin, Editor, Invitado
```

### `usuario.seeder.js`
Crea usuarios y les asigna roles de ejemplo.

---

## Pruebas sugeridas (Postman / Insomnia)

| Escenario                           | Resultado esperado                                |
|-------------------------------------|---------------------------------------------------|
| Crear usuario sin contraseña        | Error 400 (middleware)                            |
| Crear usuario con correo repetido   | Error 400 (validación Sequelize)                  |
| Asignar rol inexistente             | Error 404                                         |
| Obtener todos los usuarios          | Lista con sus roles asociados                     |
| Eliminar rol con usuarios asignados | Se eliminan relaciones en cascada con transacción |

---

## Tecnologías Utilizadas

- Node.js  
- Express.js  
- Sequelize ORM  
- PostgreSQL  
- Dotenv  
- Nodemon  

