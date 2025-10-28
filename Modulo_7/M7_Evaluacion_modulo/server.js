const express = require('express');
const app = express();
const sequelize = require('./config/db');

const usuarioRoutes = require('./routes/usuario.routes');
const rolRoutes = require('./routes/rol.routes');

const createRolSeeds = require('./seeders/rol.seeder');
const createUsuarioSeeds = require('./seeders/usuario.seeder');

app.use(express.json());
app.use('/usuarios', usuarioRoutes);
app.use('/roles', rolRoutes);

const main = async () => {
    try {
        await sequelize.sync({ force: true }); // Sincroniza modelos
        await createRolSeeds();   // Crear roles iniciales
        await createUsuarioSeeds(); // Crear usuarios iniciales

        app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
    } catch (error) {
        console.error(error);
    }
};


main();
