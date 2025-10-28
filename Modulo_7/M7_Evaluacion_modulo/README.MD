# M7 Evaluación del Módulo: Gestión de Usuarios y Roles

## Descripción

Aplicación web desarrollada con **Node.js**, **Express** y **PostgreSQL**, utilizando **Sequelize ORM** para la gestión de usuarios y roles.
Permite realizar operaciones **CRUD** y manejar relaciones **muchos a muchos** entre usuarios y roles.

---

## Tecnologías utilizadas

* Node.js
* Express.js
* Sequelize
* PostgreSQL
* dotenv
* Nodemon (para desarrollo)

---

## Instalación

1. Instalar dependencias:

```bash
npm install sequelize pg pg-hstore dotenv
```

2. Crear archivo `.env` en la raíz con la configuración de la base de datos:

```env
DB_HOST=localhost
DB_NAME=gestion_usuarios
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_DIALECT=postgres
```

4. Crear la base de datos en PostgreSQL:

```sql
CREATE DATABASE gestion_usuarios;
```

---

## Estructura del proyecto

```
.
├── config
│   └── db.js                # Configuración de la base de datos
├── controllers
│   ├── usuario.controllers.js
│   └── rol.controllers.js
├── models
│   ├── tables.js            # Asociaciones
│   ├── usuario.js
│   └── rol.js
├── routes
│   ├── usuario.routes.js
│   └── rol.routes.js
├── seeders
│   ├── usuario.seeder.js
│   └── rol.seeder.js
├── server.js
└── package.json
```

---

## Inicializar la aplicación

```bash
node server.js
```

La aplicación se ejecutará en:

```
http://localhost:3000
```

---

## Endpoints disponibles

### Usuarios

| Método | Ruta                | Descripción                |
| ------ | ------------------- | -------------------------- |
| POST   | /usuarios           | Crear un usuario           |
| GET    | /usuarios           | Listar todos los usuarios  |
| GET    | /usuarios/:id       | Obtener usuario por id     |
| PUT    | /usuarios/:id       | Actualizar usuario         |
| DELETE | /usuarios/:id       | Eliminar usuario           |
| POST   | /usuarios/:id/roles | Asignar roles a un usuario |
| DELETE | /usuarios/:id/roles | Quitar roles a un usuario  |

**Ejemplo asignar roles:**

```json
POST /usuarios/1/roles
{
  "roles": [1, 2]
}
```

---

### Roles

| Método | Ruta       | Descripción                          |
| ------ | ---------- | ------------------------------------ |
| POST   | /roles     | Crear un rol                         |
| GET    | /roles     | Listar todos los roles               |
| GET    | /roles/:id | Obtener rol por id                   |
| PUT    | /roles/:id | Actualizar rol                       |
| DELETE | /roles/:id | Eliminar rol (y desasignar usuarios) |

---

## Relaciones

* **Usuarios ↔ Roles**: Muchos a muchos (un usuario puede tener varios roles y un rol puede estar asignado a varios usuarios).
* Sequelize crea automáticamente la tabla intermedia `UsuarioRol`.

---

## Seeders

* `rol.seeder.js` → Crea roles iniciales: Admin, Editor, Invitado.
* `usuario.seeder.js` → Crea usuarios iniciales y les asigna roles.

---

## Buenas prácticas

* Uso de transacciones al eliminar roles y sus usuarios relacionados.
* Código modular siguiendo MVC.
* Variables sensibles en `.env`.
* Manejo de errores básico en controladores y rutas.

---

