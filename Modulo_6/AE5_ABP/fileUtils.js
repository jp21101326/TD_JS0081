const fs = require('fs');
const FILE_PATH = './tasks.json';

/*
 * Lee todas las tareas desde el archivo tasks.json de forma síncrona.
 */
function leerTareas() {
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer el archivo de tareas:", error.message);
        return [];
    }
}

/*
 * Escribe el arreglo de tareas en el archivo tasks.json de forma síncrona.
 */
function escribirTareas(tareas) {
    try {
        const data = JSON.stringify(tareas, null, 2);
        fs.writeFileSync(FILE_PATH, data, 'utf8');
    } catch (error) {
        console.error("Error al escribir en el archivo de tareas:", error.message);
    }
}

// Exporta las funciones de utilidad para ser usadas en server.js
module.exports = {
    leerTareas,
    escribirTareas
};