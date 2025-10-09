# 🧩 Proyecto: Sistema de Gestión de Productos (Node.js + EJS + Bootstrap)

Aplicación web desarrollada con **Node.js**, **Express** y **EJS**, que permite gestionar un inventario de productos (crear, leer, actualizar y eliminar registros) con persistencia de datos en archivos JSON, sin necesidad de base de datos.

Incluye un diseño elegante y responsivo gracias a **Bootstrap 5**.

---

## 📚 Características principales

✅ CRUD completo (Crear, Leer, Actualizar, Eliminar)  
✅ Interfaz moderna y responsiva con **Bootstrap**  
✅ Persistencia de datos en archivo `productos.json`  
✅ Motor de plantillas **EJS** para vistas dinámicas  
✅ Código limpio, modular y fácil de mantener  
✅ 100% compatible con **Node.js 18+**

---

## ⚙️ Tecnologías utilizadas

| Componente       | Descripción |
|------------------|-------------|
| Node.js          | Entorno de ejecución |
| Express.js       | Framework para servidor HTTP |
| EJS              | Motor de plantillas para vistas |
| Bootstrap 5.3    | Estilos y diseño responsivo |
| Body-Parser      | Middleware para manejo de formularios |
| JSON (archivo)   | Almacenamiento de datos local |

---

## 🧠 Estructura del proyecto

```
📦 gestion-productos
├── 📁 data
│   └── productos.json
├── 📁 public
│   └── (archivos estáticos opcionales)
├── 📁 views
│   ├── index.ejs
│   ├── agregar.ejs
│   ├── editar.ejs
│   └── error.ejs
├── server.js
└── package.json
```

---

## 🚀 Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tuusuario/gestion-productos.git
cd gestion-productos
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Ejecutar el servidor
```bash
npm start
```

o, para modo desarrollo (si tienes **nodemon** instalado):

```bash
npm run dev
```

### 4️⃣ Abrir en el navegador
👉 [http://localhost:3000](http://localhost:3000)

---

## 💾 Archivo de datos

La información se guarda automáticamente en:

```
/data/productos.json
```

Cada producto tiene la siguiente estructura:

```json
{
  "id": 1696564212345,
  "nombre": "Cuaderno universitario",
  "descripcion": "Tapa dura 100 hojas",
  "precio": 2500,
  "fechaCreacion": "2025-10-07T02:43:19.000Z"
}
```

---

## 🖥️ Capturas sugeridas

> *(Puedes agregar estas imágenes en la carpeta `/public/img` y referenciarlas si lo deseas.)*

| Vista | Descripción |
|-------|--------------|
| 🏠 `index.ejs` | Lista de productos con tabla responsive |
| ➕ `agregar.ejs` | Formulario para crear nuevo producto |
| ✏️ `editar.ejs` | Formulario de edición de producto existente |
| ⚠️ `error.ejs` | Página de error 404 personalizada |

---

## 🧩 Funcionalidades

| Acción | Ruta | Método | Descripción |
|--------|-------|---------|--------------|
| Ver todos los productos | `/` | GET | Muestra tabla con los productos |
| Agregar producto | `/agregar` | GET / POST | Formulario para crear un nuevo producto |
| Editar producto | `/editar/:id` | GET / POST | Permite modificar un producto existente |
| Eliminar producto | `/eliminar/:id` | POST | Elimina un producto del inventario |

---

## 🧰 Dependencias principales

```json
{
  "express": "^4.19.2",
  "ejs": "^3.1.10",
  "body-parser": "^1.20.2"
}
```

---

## 💡 Mejores prácticas aplicadas

- Código estructurado y modular.
- Uso de **async/await** para operaciones asíncronas.
- Manejo elegante de errores (vista `error.ejs`).
- Validación básica de datos en formularios.
- Uso de **Bootstrap** para diseño limpio y responsive.
- Persistencia local en formato JSON, sin necesidad de BD.

---

## 👨‍💻 Autor

**Nombre:** *(Agrega aquí tu nombre o el del equipo)*  
**Curso / Módulo:** M6 – Aplicaciones Backend con Node.js  
**Institución:** *(Agrega el nombre si es para entrega académica)*  
**Año:** 2025  

---

## 🏁 Licencia

Proyecto de libre uso para fines educativos y de aprendizaje.  
Puedes modificarlo y adaptarlo según tus necesidades.

---
