# Ejercicio Individual - Relaciones entre Modelos en Sequelize

Este proyecto implementa un sistema básico de **gestión de proyectos, tareas y empleados**, utilizando **Sequelize ORM** en Node.js.  
Permite crear relaciones **uno a muchos (1:N)** entre `Proyecto` y `Tarea`, y una relación **muchos a muchos (N:M)** entre `Tarea` y `Empleado`.

---

## Objetivo de la actividad
El propósito de esta actividad es entender y utilizar las **relaciones entre modelos en Sequelize**, crear las tablas necesarias y realizar operaciones CRUD con manejo de errores.

---

## Modelos y Relaciones

### **1. Modelo Proyecto**
| Atributo      | Tipo      | Descripción               |     
|---------------|-----------|---------------------------|
| nombre        | STRING    | Nombre del proyecto       |
| descripcion   | TEXT      | Descripción del proyecto  |
| fecha_inicio  | DATE      | Fecha de inicio           |
| fecha_fin     | DATE      | Fecha de término          |

### **2. Modelo Tarea**
| Atributo          | Tipo          | Descripción                                         |
|-------------------|---------------|-----------------------------------------------------|
| titulo            | STRING        | Título de la tarea                                  |
| descripcion       | TEXT          | Descripción de la tarea                             |
| estado            | STRING        | Puede ser 'pendiente', 'en progreso' o 'completada' |
| fecha_vencimiento | DATE          | Fecha de vencimiento                                |
| proyectoId        | INTEGER (FK)  | Relación con Proyecto                               |

### **3. Modelo Empleado**
| Atributo  | Tipo   | Descripción              |
|-----------|--------|--------------------------|
| nombre    | STRING | Nombre del empleado      |
| email     | STRING | Email único del empleado |

### **Relaciones:**
- Un **Proyecto** tiene muchas **Tareas** → `Proyecto.hasMany(Tarea)`  
- Una **Tarea** pertenece a un **Proyecto** → `Tarea.belongsTo(Proyecto)`  
- Una **Tarea** puede tener muchos **Empleados**, y viceversa → relación `N:M` mediante tabla intermedia `TareasEmpleados`

---

## Configuración del entorno

### ** 1 Requisitos previos**
- Node.js 
- Base de datos compatible con Sequelize (PostgreSQL, MySQL, MariaDB, etc.)

### ** 2 Instalación de dependencias**
```bash
npm install
```

### ** 3 Configurar variables de entorno**
Crea un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_NAME=tu_db
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_DIALECT=postgres
```

### ** 4 Inicializar base de datos y ejecutar proyecto**
```bash
node server.js
```

## Operaciones CRUD Implementadas

### Crear un proyecto
```js
createProyecto({ nombre: 'Proyecto Alpha', descripcion: 'Ejemplo', fecha_inicio: new Date() })
```

### Crear una tarea
```js
createTarea(proyectoId, { titulo: 'Diseñar UI', estado: 'pendiente' })
```

### Asignar empleados a una tarea
```js
assignEmpleadosToTarea(tareaId, [1, 2])
```

### Leer proyectos y tareas
```js
getAllProyectos()
```

### Actualizar una tarea
```js
updateTarea(tareaId, { estado: 'en progreso' })
```


#### Eliminar un proyecto y sus tareas
``` js
await deleteProyecto(proyectoId);
```

> **Descripción:**\
> Esta función elimina un proyecto de la base de datos junto con **todas
> sus tareas asociadas**.
>
> Esto es posible porque en la relación entre `Proyecto` y `Tarea` se
> configuró la opción:
>
> ``` js
> onDelete: 'CASCADE'
> ```
>
> lo que asegura que Sequelize y la base de datos eliminen
> automáticamente todas las tareas que dependan del proyecto eliminado.
>
> **Precaución:**\
> Usa esta operación con cuidado, ya que la eliminación es
> **permanente**.\
> Se recomienda probarla solo cuando se hayan verificado correctamente
> las inserciones y relaciones.
---

## Manejo de errores
Cada operación CRUD maneja errores mediante `try/catch`, validando la existencia de los registros antes de operar y entregando mensajes descriptivos en consola.

Ejemplo:
```js
if (!proyecto) throw new Error('Proyecto no encontrado');
```

---

## Estructura del proyecto
```
project/
├─ config/
│  └─ db.js
├─ models/
│  ├─ proyecto.js
│  ├─ tarea.js
│  ├─ empleado.js
│  └─ tables.js
├─ controllers/
│  ├─ proyecto.controllers.js
│  ├─ tarea.controllers.js
│  └─ empleado.controllers.js
├─ seeders/
│  ├─ proyecto.seeder.js
│  ├─ tarea.seeder.js
│  └─ empleado.seeder.js
├─ server.js
├─ package.json
└─ .env
```

---

## Tecnologías utilizadas
- Node.js
- Sequelize ORM
- PostgreSQL 
- dotenv

