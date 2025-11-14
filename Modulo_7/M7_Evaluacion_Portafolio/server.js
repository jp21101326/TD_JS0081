require('dotenv').config();
const express = require('express');
const app = express();

const sequelize = require('./config/db');
const { Usuario, Pedido } = require('./models/tables');
const usuariosRoutes = require('./routes/usuarios.routes');
const pedidosRoutes = require('./routes/pedidos.routes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/usuarios', usuariosRoutes);
app.use('/pedidos', pedidosRoutes);
app.get('/', (req, res) => res.send('API Tienda Online funcionando correctamente'));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const main = async () => {
  try {
    await sequelize.sync({ force: true }); // borrar la base de datos y crear tablas de nuevo
    //await sequelize.sync({ force: false }); // no borrar la base de datos, solo crear tablas si no existen
    console.log('Modelos sincronizados correctamente');
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  } catch (error) {
    console.error('Error al inicializar el servidor:', error);
  }
};

main();
