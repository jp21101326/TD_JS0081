import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();


const { Pool } = pg;


export const pool = new Pool({ connectionString: process.env.DATABASE_URL });


export async function testDbConnection() {
try {
const res = await pool.query('SELECT 1');
console.log('Postgres OK');
} catch (err) {
console.warn('Postgres connection failed:', err.message);
}
}