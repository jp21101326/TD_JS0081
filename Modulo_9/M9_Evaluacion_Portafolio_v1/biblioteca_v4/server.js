require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const librosRoutes = require('./routes/librosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Handlebars
app.engine('hbs', engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rutas de vistas
app.get('/', (req, res) => {
  res.render('home', { title: 'Biblioteca de Libros' });
});

app.get('/register-page', (req, res) => {
  res.render('register', { title: 'Registro de Usuario' });
});

app.get('/login-page', (req, res) => {
  res.render('login', { title: 'Iniciar Sesión' });
});

app.get('/libros-page', (req, res) => {
  res.render('libros', { title: 'Catálogo de Libros' });
});

app.get('/admin-page', (req, res) => {
  res.render('admin', { title: 'Panel de Administrador' });
});

// Rutas de API
app.use('/api/auth', authRoutes);
app.use('/api/libros', librosRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`Modo de almacenamiento: ${process.env.STORAGE_MODE || 'json'}`);
});