# 📚 Explorador de Libros

Aplicación web en **Node.js** con **Express** y **PostgreSQL** para explorar y visualizar libros. Se utiliza **EJS** para el frontend y **Bootstrap 5** para un diseño moderno y responsivo.


## 🧩 Características principales

- ✅ Consultar todos los libros desde PostgreSQL.  
- ✅ Visualización en una tabla estilizada con **Bootstrap 5**.  
- ✅ Modularidad con **Express Router** y **partials EJS**.  
- ✅ Manejo seguro de credenciales con **dotenv**.  
- ✅ Pool de conexiones para eficiencia y escalabilidad.  
- ✅ Fácil extensión a un CRUD completo.  


## 📁 Estructura del proyecto

```
explorador-libros/
├── db/
│   └── pool.js             # Pool de conexiones PostgreSQL
├── routes/
│   └── libros.js           # Rutas de libros
├── views/
│   ├── partials/
│   │   └── head.ejs        # Partial con Bootstrap
│   └── index.ejs           # Vista principal
├── .env                     # Variables de entorno
├── server.js                # Servidor Express
├── package.json
└── README.md
```

---

## ⚙️ Instalación

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd explorador-libros
```

2. Instala dependencias:

```bash
npm install
```

3. Configura tu `.env`:

```env
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_NAME=librosdb
```

4. Crea la base de datos y la tabla:

```sql
CREATE DATABASE librosdb;

\c librosdb;

CREATE TABLE libros (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  autor TEXT NOT NULL,
  anio INT
);

INSERT INTO libros (titulo, autor, anio)
VALUES
('Cien años de soledad', 'Gabriel García Márquez', 1967),
('El Principito', 'Antoine de Saint-Exupéry', 1943),
('Don Quijote de la Mancha', 'Miguel de Cervantes', 1605),
('1984', 'George Orwell', 1949);
```

---

## 🚀 Uso

Inicia la aplicación:

```bash
npm run dev
```

Abre en tu navegador:

```
http://localhost:8080
```

- La ruta `/` muestra los libros en **tabla Bootstrap**.  
- La ruta `/libros` devuelve los libros en **JSON**.

---

## 🎨 Capturas de ejemplo

**Vista principal (tabla de libros):**

![Tabla de libros](https://via.placeholder.com/800x400.png?text=Tabla+de+libros+Bootstrap)

**JSON de libros:**

![JSON](https://via.placeholder.com/800x400.png?text=JSON+de+libros)

*(Puedes reemplazar las imágenes con capturas reales de tu app)*

---

## 🧠 Tecnologías

- **Node.js**  
- **Express**  
- **PostgreSQL**  
- **EJS**  
- **Bootstrap 5**  
- **dotenv**  

---

## ✅ Buenas prácticas aplicadas

- Pool de conexiones para eficiencia.  
- Variables sensibles en `.env`.  
- Modularidad de rutas con **Express Router**.  
- Partials EJS para reutilización de HTML.  
- Manejo de errores con `try/catch`.  

---

## 📈 Próximas mejoras

- CRUD completo: crear, actualizar y eliminar libros.  
- Búsqueda y filtrado por título o autor.  
- Paginación de resultados.  
- Integración con API externa de libros.
