//IMPORTACIONES
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

//CONFIGURACIONES
const app = express();
const PORT = 3000;
const SECRET_KEY = 'admin.tu_clave_secreta_aqui'; 

//MIDDLEWARE
app.use(bodyParser.json());

//BASE DE DATOS SIMULADA
const usuarios = [];

// RUTAS
// RUTA DE REGISTRO
app.post('/register', async (req, res) => {
  try {
    const { email, password, role = 'user' } = req.body;
    if (!email || !password)
      return res.status(400).json({ mensaje: 'Email y password son obligatorios' });

    if (usuarios.find(u => u.email === email))
      return res.status(400).json({ mensaje: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    usuarios.push({ email, password: hashedPassword, role });

    res.json({ mensaje: 'Usuario registrado correctamente', email, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// RUTA DE LOGIN
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = usuarios.find(u => u.email === email);
    if (!usuario)
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });

    const valida = await bcrypt.compare(password, usuario.password);
    if (!valida)
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });

    const token = jwt.sign(
      { email: usuario.email, role: usuario.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ mensaje: 'Login exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// MIDDLEWARE DE AUTENTICACIÓN
const autenticarJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader)
    return res.status(401).json({ mensaje: 'Falta token en encabezado Authorization' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET_KEY, (err, usuario) => {
    if (err)
      return res.status(403).json({ mensaje: 'Token inválido o expirado' });
    
    req.usuario = usuario;
    next();
  });
};

// RUTA PROTEGIDA
app.get('/profile', autenticarJWT, (req, res) => {
  res.json({ mensaje: 'Acceso al perfil autorizado', usuario: req.usuario });
});

// RUTA ADMINISTRADOR
app.get('/admin', autenticarJWT, (req, res) => {
  if (req.usuario.role !== 'admin')
    return res.status(403).json({ mensaje: 'Acceso denegado: solo administradores' });
  res.json({ mensaje: 'Bienvenido administrador', usuario: req.usuario });
});

//RUTA RAIZ
app.get('/', (req, res) => {
  res.send('Servidor JWT activo. Usa /register, /login, /profile (protegida).');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

// MANEJO DE ERRORES
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

//SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
