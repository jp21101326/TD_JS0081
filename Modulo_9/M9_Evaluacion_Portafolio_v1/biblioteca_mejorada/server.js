import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import flash from 'connect-flash';
import authRoutes from './routes/auth.routes.js';
import librosRoutes from './routes/libros.routes.js';

const __dirname = path.resolve();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main', layoutsDir: './src/views/layouts' }));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use('/', authRoutes);
app.use('/', librosRoutes);

// después de app.use(express.urlencoded...) y app.use(express.static...)
app.use(session({
  secret: 'SESSION_SECRET_KEY', // cámbialo por variable de entorno
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hora
}));
app.use(flash());

// middleware para exponer la sesión a las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.session.user || null;
  next();
});


app.get('/', (req, res) => {
  res.redirect('/libros');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
