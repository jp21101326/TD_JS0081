# Portafolio con Express + Handlebars (hbs)

Aplicación de ejemplo que sirve un portafolio personal con rutas organizadas, vistas con parciales y contenido dinámico.

## Desarrollo de pasos:
## Paso 1: Crear archivo principal
- Crea un archivo llamado `server.js` en la raíz de tu proyecto. Este comando creará un archivo `package.json` con la configuración predeterminada, necesario para gestionar las dependencias de tu proyecto.

## Paso 2: Iniciar el proyecto con npm
- Inicializa tu proyecto de Node.js 
```bash
npm init -y
```

## Paso 3: Instalar dependencias iniciales
```bash
npm install express hbs
npm install --save-dev nodemon
```

## Paso 4: Configurar script de desarrollo
```json
"scripts": {
    "dev": "nodemon server.js"
}
```

## Paso 4: Iniciar servidor
```bash
npm run dev
```
Abre http://localhost:8080


## Características
- Uso estructura de rutas
- Handlebars (hbs) como motor de vistas
- Parciales (`header`, `footer`) y layout principal
- Helper personalizado `getFullYear`  para obtener año en el footer
- Archivos estáticos en `/public`
- Páginas: `/` (home), `/about`, `/projects`
- Página 404 personalizada
