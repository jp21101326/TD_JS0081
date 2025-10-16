import { Pool } from 'pg';
import 'dotenv/config';

export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

//Listeners
pool.on('connect', 
    () => {
        console.log('Conectado a PostgreSQL');
    }
);

pool.on('error', 
    (err) => {
        console.error('Error en la conexión con PostgreSQL:', err.message);
    }
);

// Cerrar pool al terminar la app
process.on('SIGINT', 
    async () => {
        await pool.end();
        console.log('Pool cerrado. Servidor detenido.');
        process.exit();
    }
);