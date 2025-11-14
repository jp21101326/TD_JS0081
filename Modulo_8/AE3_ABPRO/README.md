# File Upload Server (Express)

Servidor avanzado con soporte de carga múltiple de archivos, validaciones, transformaciones y eliminación.

## Instalación
```bash
npm install
```

## Ejecución
```bash
npm run dev
```
Servidor disponible en `http://localhost:3000`.

## Rutas principales

### POST /upload
- Campo: `files` (permite hasta 10 archivos).
- Extensiones permitidas: `.jpg`, `.jpeg`, `.png`, `.gif`, `.pdf`, `.txt`.
- Tamaño máximo: 5 MB por archivo.
- Imágenes `.jpg`/`.png` se convierten a `.png` y se redimensionan (máx 1200px).

Ejemplo:
```bash
curl -X POST http://localhost:3000/upload -F "files=@imagen1.jpg" -F "files=@documento.pdf"
```

### DELETE /delete/:filename
Elimina un archivo por nombre.

### GET /files
Lista los archivos subidos.
