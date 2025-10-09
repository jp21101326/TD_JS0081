# 🛒 Proyecto Node.js - Gestión de Productos

Este proyecto es una aplicación simple desarrollada en **Node.js + Express**, que permite gestionar productos de una tienda.  
La persistencia de los datos se realiza en un archivo **JSON**, sin usar base de datos.  
Se implementa un sistema de vistas con **EJS + Bootstrap 5** para una interfaz moderna y funcional.

---

## 📌 Características

- 📂 Gestión de productos con operaciones básicas:
  - Listar productos
  - Agregar productos
- 💾 Persistencia en archivo `productos.json`
- 🎨 Vistas en **EJS** estilizadas con **Bootstrap 5**
- ⚡ Servidor con **Express**
- 🛠️ Dependencias adicionales:  
  - `chalk` para mensajes de consola coloridos  
  - `yargs` para manejo de argumentos en CLI  

---

## 📂 Estructura del proyecto

```
.
├── productos.json          # Archivo de persistencia
├── public/                 # Archivos estáticos (CSS, imágenes)
│   └── style.css           # (opcional, estilos simples)
├── views/                  # Vistas con EJS
│   ├── index.ejs           # Página de inicio
│   ├── productos.ejs       # Listado y formulario de productos
│   └── error.ejs           # Vista de error
├── server.js               # Servidor principal Express
├── package.json            # Configuración de Node.js y dependencias
└── README.md               # Documentación del proyecto
```

---

## ⚙️ Instalación

1. Clonar el repositorio:
   ```bash
   git clone <URL_REPO>
   cd <NOMBRE_PROYECTO>
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

   Dependencias principales:
   ```json
   "chalk": "^4.1.2",
   "yargs": "^17.7.2",
   "express": "^4.18.2",
   "ejs": "^3.1.9"
   ```

---

## ▶️ Ejecución del proyecto

Modo desarrollo (con **nodemon** si está instalado):
```bash
npm run dev
```

Modo normal:
```bash
npm start
```

El servidor estará disponible en:  
👉 `http://localhost:3000`

---

## 🔗 Links de Navegación (Navbar)

El sistema cuenta con los siguientes enlaces accesibles desde la barra de navegación:

- **Inicio** → [`http://localhost:3000/`](http://localhost:3000/)  
- **Productos** → [`http://localhost:3000/productos`](http://localhost:3000/productos)  
- **Página de Error** (solo cuando ocurre un problema)  

---

## ❓ Preguntas y Respuestas del Trabajo

**Pregunta 7:** ¿Qué tipo de errores puede ayudar a detectar `console.log()` cuando se usa estratégicamente?  
✅ **Respuesta:** b. Llamadas a funciones no ejecutadas correctamente  

**Pregunta 8:** Es una buena práctica no mostrar ningún mensaje en consola al detectar errores.  
✅ **Respuesta:** Falso  

---

## 📤 Despliegue en GitHub

1. Inicializar el repositorio si no está creado:
   ```bash
   git init
   git add .
   git commit -m "Primer commit - Proyecto gestión de productos"
   ```

2. Conectar con GitHub:
   ```bash
   git remote add origin https://github.com/USUARIO/NOMBRE_REPO.git
   git branch -M main
   git push -u origin main
   ```

---

## 👨‍💻 Autor
Proyecto desarrollado para fines educativos en **Node.js**, con vistas dinámicas y persistencia en archivos JSON.
