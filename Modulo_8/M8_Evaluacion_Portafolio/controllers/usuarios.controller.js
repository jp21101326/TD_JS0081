const path = require('path');
const fs = require('fs');
const Users = require('../models/users.model');

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOADS_DIR))
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const ALLOWED = ['png', 'jpg', 'jpeg', 'gif'];
const MAX_SIZE = 5 * 1024 * 1024;

const crear = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ message: 'Usuario y password obligatorios' });

    if (typeof username !== 'string' || username.length < 3) {
      return res.status(400).json({ message: 'Username debe tener al menos 3 caracteres' });
    }
    if (typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ message: 'Password debe tener al menos 6 caracteres' });
    }
       
    const user = await Users.crearUsuario({ username, password });

    return res.status(201).json({ message: 'Usuario creado', user });
  } catch (err) {
    if (err.message.includes('Usuario ya existe')) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Error creando usuario' });
  }
};

const obtener = (req, res) => {
  try {
    const id = req.params.id;
    const user = Users.buscarPorId(id);

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Seguridad
    if (req.user.id !== user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    const { password, refreshToken, ...safe } = user;

    res.json(safe);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo usuario' });
  }
};

const actualizar = (req, res) => {
  try {
    const id = req.params.id;
    const user = Users.buscarPorId(id);

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (req.user.id !== user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    const allowedFields = ['username', 'role', 'profile'];
    const toUpdate = {};

    allowedFields.forEach((f) => {
      if (req.body[f] !== undefined) toUpdate[f] = req.body[f];
    });

    const updated = Users.actualizarUsuario(id, toUpdate);

    res.json({ message: 'Usuario actualizado', user: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error actualizando usuario' });
  }
};

const eliminar = (req, res) => {
  try {
    const id = req.params.id;
    const user = Users.buscarPorId(id);

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (req.user.id !== user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    // Borrar avatar si existe
    if (user.profile?.avatar) {
      const filePath = path.join(UPLOADS_DIR, path.basename(user.profile.avatar));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    Users.eliminarUsuario(id);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error eliminando usuario' });
  }
};

const subirImagen = async (req, res) => {
  try {
    const id = req.params.id;
    const user = Users.buscarPorId(id);

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (req.user.id !== user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    if (!req.files || !req.files.imagen) {
      return res.status(400).json({ message: 'No se ha enviado imagen' });
    }

    const file = req.files.imagen;
    const ext = path.extname(file.name).toLowerCase().replace('.', '');

    if (!ALLOWED.includes(ext)) {
      return res.status(400).json({ message: 'Tipo de archivo no permitido' });
    }

    if (file.size > MAX_SIZE) {
      return res.status(400).json({ message: 'Archivo demasiado grande' });
    }

    const safeName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const savePath = path.join(UPLOADS_DIR, safeName);

    await file.mv(savePath);

    const updated = Users.actualizarUsuario(id, {
      profile: { ...user.profile, avatar: `/uploads/${safeName}` },
    });

    res.json({
      message: 'Imagen subida',
      avatar: `/uploads/${safeName}`,
      user: updated,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error subiendo imagen' });
  }
};

module.exports = { crear, obtener, actualizar, eliminar, subirImagen };
