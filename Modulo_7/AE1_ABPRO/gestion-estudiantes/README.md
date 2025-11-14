# Gestión de Estudiantes - Node.js + PostgreSQL

Aplicación web desarrollada en **Node.js**, **Express** y **PostgreSQL** que permite gestionar estudiantes de un curso: **alta, baja, modificación y consulta**.  
El proyecto implementa el uso del paquete **pg**, conexión mediante **pooling**, manejo de errores y vistas dinámicas con **EJS** y **Bootstrap**.

---

## Proyecto grupal
**AE1_ABPRO - Ejercicio grupal [Actividad Opcional] - SALA 1**

---

## Tecnologías utilizadas

- **Node.js** – Entorno de ejecución de JavaScript  
- **Express** – Framework para construir el servidor  
- **PostgreSQL** – Base de datos relacional  
- **pg** – Cliente PostgreSQL para Node.js  
- **dotenv** – Manejo de variables de entorno  
- **EJS** – Motor de plantillas para vistas dinámicas  
- **Bootstrap 5** – Diseño y estilo visual responsivo  

---

## Estructura del proyecto

```
gestion-estudiantes/
│
├── db/
│   └── pool.js
│
├── routes/
│   └── estudiantes.js
│
├── views/
│   ├── index.ejs
│   ├── nuevo.ejs
│   ├── editar.ejs
│   └── partials/
│       ├── head.ejs
│       ├── header.ejs
│       └── footer.ejs
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

## Instalación y configuración

### 1.- Clonar el repositorio
```bash
git clone https://github.com/tuusuario/gestion-estudiantes.git
cd gestion-estudiantes
```

### 2.- Instalar dependencias
```bash
npm install
```

### 3.- Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con tus credenciales de PostgreSQL:

```
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_NAME=estudiantesdb
```

### 4.- Crear la base de datos y tabla
En PostgreSQL, ejecutar:

```sql
CREATE DATABASE estudiantesdb;

CREATE TABLE estudiantes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  edad INT NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL,
  fecha_registro TIMESTAMP DEFAULT NOW()
);

INSERT INTO estudiantes (nombre, edad, correo)
VALUES 
('Ana Torres', 20, 'ana.torres@example.com'),
('Luis Pérez', 22, 'luis.perez@example.com'),
('María López', 21, 'maria.lopez@example.com');
```

---

## Configuración técnica

### `db/pool.js`
Configura la conexión con PostgreSQL usando el **pool** de conexiones:
```js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  max: 10,
  idleTimeoutMillis: 30000
});

module.exports = pool;
```

---

## 🛠️ Funcionalidades principales

### Estudiantes
| Acción            | Método | Ruta                         | Descripción                               |
|-------------------|--------|------------------------------|-------------------------------------------|
| Listar todos      | `GET`  | `/estudiantes`               | Muestra la lista completa                 |
| Buscar            | `GET`  | `/estudiantes/buscar?q=`     | Busca por nombre o correo                 |
| Ver JSON          | `GET`  | `/estudiantes/json`          | Devuelve los registros en formato JSON    |
| Formulario nuevo  | `GET`  | `/estudiantes/nuevo`         | Muestra formulario de alta                |
| Agregar           | `POST` | `/estudiantes/nuevo`         | Inserta nuevo estudiante                  |
| Formulario editar | `GET`  | `/estudiantes/editar/:id`    | Muestra datos del estudiante              |
| Editar            | `POST` | `/estudiantes/editar/:id`    | Actualiza los datos                       |
| Eliminar          | `GET`  | `/estudiantes/eliminar/:id`  | Elimina registro por ID                   |

---

## Ejecución del proyecto

### Iniciar el servidor
```bash
npm start
```
o en modo desarrollo:
```bash
npm run dev
```

### Luego abrir en el navegador:
 [http://localhost:8080](http://localhost:8080)

---

##  Vistas EJS

Las vistas se componen de **partials** reutilizables:

- `partials/head.ejs` → Metadatos y Bootstrap  
- `partials/header.ejs` → Menú de navegación  
- `partials/footer.ejs` → Información y redes sociales  

Las páginas principales:
- **index.ejs** → Lista de estudiantes  
- **nuevo.ejs** → Formulario de registro  
- **editar.ejs** → Formulario de edición  

Cada acción muestra mensajes con **SweetAlert** para mejor experiencia de usuario.

---

## Buenas prácticas aplicadas

- Uso de **pool de conexiones** para optimizar rendimiento.  
- Manejo de errores con `try/catch`.  
- Separación por capas: **rutas**, **base de datos**, **vistas**.  
- Variables sensibles en **.env**.  
- Código modular y legible.  
- Uso de **EJS partials** para evitar duplicación.  
- **Bootstrap 5** para diseño limpio y profesional.

---

## Enlaces de referencia

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [pg npm](https://www.npmjs.com/package/pg)
- [EJS templates](https://ejs.co/)
- [Bootstrap](https://getbootstrap.com/)

---

## Capturas sugeridas (opcional)

- Listado de estudiantes  
- Formulario de alta  
- Edición de estudiante  
- Eliminación con confirmación  

---

