# Gestión de Contactos con Node.js y Express

Esta aplicación es un CRUD (Crear, Leer, Actualizar, Eliminar) básico para gestionar contactos, utilizando **Node.js**, el framework **Express** y el motor de plantillas **EJS**. Los datos se persisten en un archivo JSON simple.

## Configuración del Entorno

### Requisitos

* Tener instalado **Node.js** (versión 14 o superior recomendada).

### Instalación de Dependencias

1.  Clona o descarga este repositorio.
2.  Abre la terminal en la carpeta raíz del proyecto.
3.  Instala las dependencias de producción (`express` y `ejs`) y desarrollo (`nodemon`):

```bash
    npm install express ejs
```

4.  También podrías instalar nodemon como devDependency para reiniciar el servidor automáticamente, como en tu material.

```bash
   npm install -D nodemon
 ```

4.  Y actualizar el package.json para tener un script de desarrollo:

```bash
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js" // Usaremos app.js como archivo principal
},
 ```

## Ejecución de la Aplicación

Existen dos formas de iniciar el servidor:

### 1. Modo Desarrollo (Recomendado)

Utiliza `nodemon` para que el servidor se reinicie automáticamente al guardar cambios en `server.js`:

```bash
   npm run dev
 ```

 

 ### 2. Modo Producción
Inicia la aplicación con Node.js directamente:

```bash
   npm start
 ```

Una vez que el servidor esté en funcionamiento, accede a la aplicación en tu navegador:
http://localhost:3000