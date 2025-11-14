const path = require('path');
const fs = require('fs');

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const ALLOWED_IMAGES = ['png', 'jpg', 'jpeg', 'gif'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB por archivo

// helper para mover el archivo con promesa
const mvAsync = (file, dest) => new Promise((resolve, reject) => {
  file.mv(dest, (err) => {
    if (err) return reject(err);
    resolve();
  });
});

const uploadFile = async (req, res) => {
  try {
    if (!req.files || !req.files.file) return res.status(400).json({ message: 'No se ha enviado archivo' });
    const archivos = Array.isArray(req.files.file) ? req.files.file : [req.files.file];
    const saved = [];

    for (const archivo of archivos) {
      const ext = path.extname(archivo.name).toLowerCase().replace('.', '');
      if (!ALLOWED_IMAGES.includes(ext)) return res.status(400).json({ message: `Extensión no permitida: ${archivo.name}` });
      if (archivo.size > MAX_IMAGE_SIZE) return res.status(400).json({ message: `Archivo demasiado grande: ${archivo.name}` });
      const safeName = `${Date.now()}-${archivo.name.replace(/\s+/g, '_')}`;
      const savePath = path.join(UPLOADS_DIR, safeName);
      await mvAsync(archivo, savePath);
      saved.push({ originalName: archivo.name, savedName: safeName, url: `/uploads/${safeName}`, size: archivo.size });
    }

    res.status(201).json({ message: 'Archivos subidos', files: saved });
  } catch (err) {
    console.error('Error subiendo archivo:', err);
    res.status(500).json({ message: 'Error subiendo archivos' });
  }
};

const listUploads = (req, res) => {
  try {
    const files = fs.readdirSync(UPLOADS_DIR).map(name => {
      const stat = fs.statSync(path.join(UPLOADS_DIR, name));
      return { name, url: `/uploads/${name}`, size: stat.size };
    });
    res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'No se pudo listar archivos' });
  }
};

const deleteFile = (req, res) => {
  try {
    const nombre = req.params.filename;
    const filePath = path.join(UPLOADS_DIR, nombre);
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'Archivo no encontrado' });
    fs.unlinkSync(filePath);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'No se pudo eliminar el archivo' });
  }
};


module.exports = { 
   uploadFile,
   listUploads,
    deleteFile
 };
