# 🛍️ Tienda Online - Sistema de Gestión de Productos

## 📋 Descripción del Proyecto

Aplicación web backend desarrollada con Node.js y Express para la gestión de productos de una tienda en línea. El sistema permite crear, visualizar y eliminar productos, almacenándolos de manera persistente en archivos JSON.

Este proyecto forma parte de mi portafolio de desarrollo backend y demuestra habilidades en:
- Desarrollo de servidores web con Express
- Gestión de rutas y middlewares
- Persistencia de datos con el sistema de archivos (fs)
- Manejo profesional de errores
- Validación de parámetros con Yargs
- Interfaz dinámica con EJS

---

## 🎯 Objetivos Cumplidos

✅ **Instalación y configuración de Node.js y Express**  
✅ **Gestión de rutas y respuestas dinámicas**  
✅ **Persistencia de datos en archivos JSON**  
✅ **Gestión de dependencias con npm**  
✅ **Manejo robusto de errores (404, 500)**  
✅ **Interfaz web profesional con motor de plantillas EJS**  

---

## 🚀 Instalación del Entorno

### Requisitos Previos

- **Node.js** versión 14 o superior
- **npm** (incluido con Node.js)

### ¿Qué es npm?

**npm (Node Package Manager)** es el gestor de paquetes de Node.js que permite:
- Instalar bibliotecas y dependencias de terceros
- Gestionar versiones de paquetes
- Ejecutar scripts de automatización
- Compartir código con la comunidad

### Pasos de Instalación

1. **Verificar instalación de Node.js y npm:**
   ```bash
   node --version
   npm --version
   ```

2. **Clonar o crear el proyecto:**
   ```bash
   mkdir tienda-online
   cd tienda-online
   ```

3. **Inicializar el proyecto:**
   ```bash
   npm init -y
   ```
   Este comando crea el archivo `package.json` que contiene la configuración del proyecto y sus dependencias.

4. **Instalar dependencias de producción:**
   ```bash
   npm install express ejs body-parser chalk yargs
   ```
   
   - **Express**: Framework web minimalista y flexible para Node.js
   - **EJS**: Motor de plantillas para generar HTML dinámico
   - **body-parser**: Middleware para procesar datos de formularios
   - **chalk**: Librería para colorear mensajes en consola
   - **yargs**: Librería para validación profesional de parámetros

5. **Instalar dependencias de desarrollo:**
   ```bash
   npm install --save-dev nodemon
   ```
   
   - **Nodemon**: Herramienta que reinicia automáticamente el servidor al detectar cambios en el código

---

## 📁 Estructura del Proyecto

```
tienda-online/
├── data/
│   └── productos.json          # Almacenamiento persistente de productos
├── public/
│   └── css/
│       └── styles.css          # Estilos de la aplicación
├── views/
│   ├── index.ejs               # Página principal
│   ├── productos.ejs           # Lista de productos
│   ├── agregar-producto.ejs    # Formulario de nuevo producto
│   └── error.ejs               # Página de errores
├── server.js                   # Servidor principal de Express
├── package.json                # Configuración y dependencias
└── README.md                   # Documentación
```

---

## ⚙️ Configuración del Servidor Express

### ¿Qué es Express?

**Express** es un framework web para Node.js que simplifica la creación de servidores y APIs. Proporciona:
- Sistema de enrutamiento robusto
- Middlewares para procesamiento de peticiones
- Integración con motores de plantillas
- Manejo de archivos estáticos
- Gestión de errores centralizada

### Características del Servidor

El servidor implementa las siguientes funcionalidades:

1. **Puerto Configurable**: Por defecto en 3000, configurable con `--port`
2. **Entornos Múltiples**: Soporte para dev, test y prod con `--env`
3. **Motor de Plantillas EJS**: Renderización dinámica de HTML
4. **Archivos Estáticos**: Servidor de CSS, imágenes, etc.
5. **Body Parser**: Procesamiento de formularios HTML
6. **Manejo de Errores**: Middlewares para 404 y 500

---

## 🛣️ Rutas Disponibles

### Rutas Web (HTML)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Página principal de bienvenida |
| GET | `/productos` | Lista todos los productos |
| GET | `/productos/agregar` | Formulario para nuevo producto |
| POST | `/productos/agregar` | Procesa el formulario y guarda el producto |
| POST | `/productos/eliminar/:id` | Elimina un producto por ID |

### Rutas API (JSON)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Devuelve productos en formato JSON |

### Manejo de Errores

- **404 Not Found**: Cualquier ruta no definida muestra página de error
- **500 Server Error**: Errores internos capturados y mostrados de forma amigable

---

## 💾 Persistencia de Datos

### Sistema de Archivos (fs)

El proyecto utiliza el módulo nativo `fs` de Node.js para leer y escribir datos en archivos JSON.

### Funciones de Persistencia

#### **leerProductos()**
```javascript
function leerProductos() {
  try {
    if (!fs.existsSync(PRODUCTOS_FILE)) {
      // Crear archivo vacío si no existe
      fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
      fs.writeFileSync(PRODUCTOS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(PRODUCTOS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(chalk.red('Error al leer productos:'), error.message);
    return [];
  }
}
```

#### **guardarProductos(productos)**
```javascript
function guardarProductos(productos) {
  try {
    fs.writeFileSync(PRODUCTOS_FILE, JSON.stringify(productos, null, 2));
    return true;
  } catch (error) {
    console.error(chalk.red('Error al guardar productos:'), error.message);
    return false;
  }
}
```

### Ventajas de la Persistencia en Archivos

✅ No requiere configuración de base de datos  
✅ Fácil de implementar y mantener  
✅ Datos legibles en formato JSON  
✅ Perfecto para prototipos y aplicaciones pequeñas  

---

## 📦 Gestión de Dependencias con npm

### package.json

Este archivo es el corazón del proyecto. Contiene:

1. **Metadatos**: Nombre, versión, descripción, autor
2. **Scripts**: Comandos personalizados para ejecutar la aplicación
3. **Dependencias**: Paquetes necesarios para producción
4. **DevDependencies**: Paquetes solo para desarrollo

### Scripts Personalizados

```json
"scripts": {
  "dev": "nodemon server.js --env=dev",
  "test": "node server.js --env=test",
  "start": "node server.js --env=prod"
}
```

### Instalación de Dependencias

Cuando alguien clona el proyecto, solo necesita ejecutar:
```bash
npm install
```

npm lee `package.json` e instala automáticamente todas las dependencias listadas.

---

## 🎨 Uso de Chalk para Consola Coloreada

Chalk mejora la experiencia de desarrollo coloreando mensajes:

```javascript
console.log(chalk.green('✅ Producto agregado exitosamente'));
console.log(chalk.red('❌ Error al guardar el producto'));
console.log(chalk.blue('ℹ️ Servidor iniciado'));
console.log(chalk.yellow('⚠️ Advertencia: Archivo no encontrado'));
```

### Beneficios

- **Identificación rápida** de errores vs éxitos
- **Mejor legibilidad** en la consola
- **Depuración más eficiente**

---

## ⚡ Ejecución de la Aplicación

### Modo Desarrollo (con Nodemon)

```bash
npm run dev
```

Nodemon reinicia automáticamente el servidor al detectar cambios en el código.

### Modo Producción

```bash
npm start
```

### Con Parámetros Personalizados

```bash
# Cambiar puerto
node server.js --port=5000

# Cambiar entorno
node server.js --env=test

# Combinar parámetros
node server.js --env=prod --port=8080
```

### Acceso a la Aplicación

Una vez iniciado el servidor, abre tu navegador en:
```
http://localhost:3000
```

---

## 🛡️ Manejo de Errores

### Tipos de Errores Manejados

1. **Errores de Validación (400)**
   - Campos obligatorios faltantes
   - Datos en formato incorrecto

2. **Errores de Recurso No Encontrado (404)**
   - Rutas inexistentes
   - Archivos no encontrados

3. **Errores Internos del Servidor (500)**
   - Fallos al leer/escribir archivos
   - Errores de parsing JSON
   - Excepciones no controladas

### Middleware de Errores 404

```javascript
app.use((req, res) => {
  res.status(404).render('error', {
    mensaje: 'Página no encontrada',
    error: `La ruta ${req.url} no existe`
  });
});
```

### Middleware de Errores 500

```javascript
app.use((err, req, res, next) => {
  console.error(chalk.red('Error del servidor:'), err.stack);
  res.status(500).render('error', {
    mensaje: 'Error interno del servidor',
    error: ENVIRONMENT === 'dev' ? err.message : 'Error inesperado'
  });
});
```

---

## 🧪 Pruebas de Funcionalidad

### Checklist de Pruebas

- [ ] El servidor inicia correctamente en el puerto 3000
- [ ] La página principal se carga y muestra el mensaje de bienvenida
- [ ] La ruta `/productos` muestra la lista vacía inicialmente
- [ ] El formulario de agregar producto funciona correctamente
- [ ] Los productos se guardan en `data/productos.json`
- [ ] Los productos guardados se muestran en la lista
- [ ] Se puede eliminar un producto
- [ ] Las rutas inexistentes muestran error 404
- [ ] Los errores del servidor se manejan adecuadamente
- [ ] La API `/api/productos` devuelve JSON válido

### Datos de Prueba

Producto de ejemplo:
- **Nombre**: Laptop HP Pavilion
- **Descripción**: Laptop de 15.6 pulgadas con procesador Intel Core i5
- **Precio**: 599.99

---

## 🔧 Mantenimiento y Producción

### Recomendaciones para Producción

1. **Variables de Entorno**: Usar archivo `.env` para configuraciones sensibles
2. **Proceso Manager**: Usar PM2 para mantener el servidor activo
3. **Logs**: Implementar sistema de logs robusto
4. **Validación**: Agregar validación más estricta en el backend
5. **Base de Datos**: Migrar a MongoDB o PostgreSQL para mayor escalabilidad
6. **Autenticación**: Implementar sistema de usuarios y permisos
7. **HTTPS**: Configurar certificados SSL para comunicación segura

### Mejoras Futuras

- [ ] Paginación de productos
- [ ] Búsqueda y filtros
- [ ] Edición de productos existentes
- [ ] Carga de imágenes
- [ ] Categorías de productos
- [ ] Sistema de inventario
- [ ] Panel de administración

---

## 📚 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js | 14+ | Entorno de ejecución JavaScript |
| Express | 4.18.2 | Framework web |
| EJS | 3.1.9 | Motor de plantillas |
| Body-Parser | 1.20.2 | Procesamiento de formularios |
| Chalk | 4.1.2 | Colorear consola |
| Yargs | 17.7.2 | Validación de parámetros |
| Nodemon | 3.1.10 | Reinicio automático (dev) |

---

## 👨‍💻 Autor

**Tu Nombre**  
Proyecto de Portafolio - Desarrollo Backend con Node.js y Express

---

## 📄 Licencia

ISC

---

## 🤝 Contribuciones

Este es un proyecto educativo de portafolio. Las sugerencias y mejoras son bienvenidas.

---

## 📞 Soporte

Si encuentras algún problema o tienes preguntas:
1. Revisa la documentación completa
2. Verifica los logs en la consola del servidor
3. Asegúrate de que todas las dependencias estén instaladas
4. Confirma que el archivo `data/productos.json` sea accesible

---

**¡Gracias por revisar este proyecto!** 🚀