// Servidor de carga y gestión de archivos con Express y Multer
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Asegurarse de que el directorio de cargas exista
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.txt'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;// 5 MB

// Generar un nombre de archivo único
function generateUniqueName(originalName) {
  const ext = path.extname(originalName);
  const base = path.basename(originalName, ext).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, '');
  let candidate = `${base}${ext}`;
  let counter = 0;
  while (fs.existsSync(path.join(UPLOADS_DIR, candidate))) {
    counter++;
    candidate = `${base}-${Date.now()}-${counter}${ext}`;
  }
  return candidate;
}

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, generateUniqueName(file.originalname))
});

// Filtro de archivos permitidos
function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) {
    const err = new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname);
    err.message = `Extensión no permitida: ${ext}`;
    return cb(err);
  }
  cb(null, true);
}

// Inicializar Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE }
});

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// interfaz de usuario para cargar archivos http://localhost:3000/
// Servir la carpeta uploads de forma pública
// app.use('/uploads', express.static(UPLOADS_DIR));
// Servir el cliente HTML desde la raíz
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'upload_client.html'));
// });

// Rutas
app.post('/upload', (req, res, next) => {
  const multi = upload.array('files', 10);
  multi(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') return res.status(413).json({ error: 'Archivo demasiado grande (máx 5 MB).' });
      if (err.code === 'LIMIT_UNEXPECTED_FILE') return res.status(400).json({ error: err.message });
      return res.status(400).json({ error: err.message });
    } else if (err) return next(err);

    // Verificar si se subieron archivos
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ error: 'No se proporcionaron archivos. Usar campo "files".' });

    // Procesar cada archivo subido
    const results = [];
    for (const file of req.files) {
      const uploadedPath = file.path;
      const ext = path.extname(file.filename).toLowerCase();
      const mimetype = file.mimetype;

      if (mimetype.startsWith('image/') && ['.jpg', '.jpeg', '.png'].includes(ext)) {
        const base = path.basename(file.filename, ext);
        const targetFilename = `${base}.png`;
        const targetPath = path.join(UPLOADS_DIR, targetFilename);

        try {
          await sharp(uploadedPath).resize({ width: 1200, withoutEnlargement: true }).png().toFile(targetPath);
          if (targetPath !== uploadedPath) fs.unlinkSync(uploadedPath);
          const stats = fs.statSync(targetPath);
          results.push({
            message: 'Imagen transformada correctamente.',
            originalName: file.originalname,
            storedName: targetFilename,
            mimetype: 'image/png',
            size: stats.size
          });
        } catch (e) {
          try { fs.unlinkSync(uploadedPath); } catch {}
          return next(e);
        }
      } else {
        results.push({
          message: 'Archivo subido correctamente.',
          originalName: file.originalname,
          storedName: file.filename,
          mimetype: file.mimetype,
          size: file.size
        });
      }
    }

    // Responder con los detalles de los archivos subidos
    res.status(201).json({ message: 'Carga completa.', files: results });
  });
});

// Eliminar un archivo
app.delete('/delete/:filename', async (req, res, next) => {
  try {
    const filename = req.params.filename;
    if (filename.includes('..') || path.isAbsolute(filename))
      return res.status(400).json({ error: 'Nombre de archivo inválido.' });
    const targetPath = path.join(UPLOADS_DIR, filename);
    if (!fs.existsSync(targetPath)) return res.status(404).json({ error: 'Archivo no encontrado.' });
    await fs.promises.unlink(targetPath);
    res.json({ message: 'Archivo eliminado con éxito.', filename });
  } catch (err) {
    next(err);
  }
});

// Listar archivos cargados
app.get('/files', (req, res, next) => {
  fs.readdir(UPLOADS_DIR, (err, files) => {
    if (err) return next(err);
    res.json(files);
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor ejecutándose en http://localhost:${PORT}`));
