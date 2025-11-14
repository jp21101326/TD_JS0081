# AE5 - Clases en JavaScript y ORM Sequelize (Proyecto: Biblioteca)

## Propósito de la actividad
El objetivo de esta actividad es aplicar los conceptos de **Programación Orientada a Objetos (POO)** en JavaScript mediante la creación de una clase, e implementar **Sequelize** como ORM para gestionar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre una base de datos **PostgreSQL**.

---

## Estructura del proyecto

```
AE5-LIBROS/
│
├─ CLASES/
│   └─ libro.js               
│
├─ CONFIG/
│   └─ db.js                   
│
├─ MODELS/
│   └─ libro.js                
│
├─ CONTROLLERS/
│   └─ libro.controllers.js    
│
├─ .env                        
│
├─ SERVER.JS                   
│
└─ README.md                   
```

---

## Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) v16 o superior  
- [PostgreSQL](https://www.postgresql.org/)  
- Un cliente SQL como **pgAdmin** o **DBeaver**

---

## Instalación del proyecto

1. Clona o descarga este repositorio:
   ```bash
   git clone https://github.com/tuusuario/AE5-LIBROS.git
   cd AE5-LIBROS
   ```

2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

3. Crea un archivo **.env** en la raíz del proyecto con tus credenciales de PostgreSQL:
   ```env
   DB_NAME=biblioteca
   DB_USER=postgres
   DB_PASSWORD=tu_contraseña
   DB_HOST=localhost
   DB_DIALECT=postgres
   ```

4. Crea una base de datos en PostgreSQL llamada **biblioteca**:
   ```sql
   CREATE DATABASE biblioteca;
   ```

---

## Ejecución del proyecto

Ejecuta el servidor con:
```bash
node server.js
```

Verás mensajes como:
```
- Conexión a la base de datos PostgreSQL exitosa.
- Todos los modelos fueron sincronizados correctamente.
- Libro de prueba creado.
```

---

## Descripción técnica

### Parte 1 – Clase en JavaScript
El archivo `CLASES/libro.js` define una clase **Libro** utilizando los principios de POO:
- **Constructor**: inicializa los atributos `titulo`, `autor`, `anioPublicacion`, `isbn`.
- **Getters y Setters**: controlan el acceso y validación de propiedades.
- **Método personalizado**: `mostrarDetalles()` imprime la información del libro.

Ejemplo:
```javascript
const libro1 = new Libro('1984', 'George Orwell', 1949, '9780451524935');
libro1.mostrarDetalles();
```

---

### Parte 2 – ORM Sequelize

#### Configuración
El archivo `CONFIG/db.js` configura Sequelize para conectarse a PostgreSQL mediante variables de entorno.

#### Modelo
`MODELS/libro.js` define el modelo Sequelize que representa la tabla `Libros` con columnas:
- `id` (Primary Key)
- `titulo`
- `autor`
- `anioPublicacion`
- `isbn`

#### Controlador
`CONTROLLERS/libro.controllers.js` implementa las funciones CRUD:
- **createLibro()** → Crear un nuevo registro.
- **getAllLibros()** → Leer todos los registros.
- **getLibroById()** → Leer un registro por ID.
- **updateLibro()** → Actualizar un libro existente.
- **deleteLibro()** → Eliminar un libro.

#### Ejecución
`SERVER.JS` sincroniza la base de datos y ejecuta pruebas automáticas de las funciones CRUD usando `async/await`.

---

## Operaciones CRUD realizadas

| Operación | Método | Descripción | Ejemplo |
|------------|---------|-------------|----------|
| Crear | `createLibro()` | Inserta un nuevo libro en la base de datos. | `await createLibro({...})` |
| Leer todos | `getAllLibros()` | Obtiene todos los registros de libros. | `await getAllLibros()` |
| Leer por ID | `getLibroById()` | Obtiene un libro según su ID. | `await getLibroById(1)` |
| Actualizar | `updateLibro()` | Modifica los datos de un libro existente. | `await updateLibro(1, { autor: 'Actualizado' })` |
| Eliminar | `deleteLibro()` | Elimina un registro de la tabla libros. | `await deleteLibro(1)` |

---

## Ventajas de usar un ORM (Sequelize)

- **Abstracción del SQL:** No es necesario escribir consultas manuales.
- **Seguridad:** Evita inyección SQL mediante consultas parametrizadas.
- **Portabilidad:** Permite cambiar el motor de base de datos fácilmente.
- **Productividad:** Código más limpio, reutilizable y mantenible.
- **Compatibilidad:** Funciona con PostgreSQL, MySQL, SQLite y otros motores SQL.

---

## Conclusión

Este proyecto demuestra cómo:
1. Definir y utilizar **clases en JavaScript**.
2. Configurar **Sequelize** como ORM para PostgreSQL.
3. Implementar **CRUD asíncrono con manejo de errores**.
4. Aplicar buenas prácticas de organización y separación por capas.

> Desarrollado como ejercicio individual AE5 — “Clases en JavaScript y ORM Sequelize”.

---
