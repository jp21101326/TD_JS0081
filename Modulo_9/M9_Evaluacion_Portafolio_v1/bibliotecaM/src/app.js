import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import cors from 'cors';
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

app.get('/', (req, res) => {
  res.redirect('/libros');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
