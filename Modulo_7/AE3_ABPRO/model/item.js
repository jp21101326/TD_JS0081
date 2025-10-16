import { pool } from "../db/pool.js";
import { ErrorRecursosNoEncontrado, ErrorServidor } from "../utils/errors.js";

export const listarItems = async() => {
    try{
        const resultados = await pool.query('SELECT * FROM productos ORDER BY id');
        
        return resultados.rows;

    } catch(error) {
        throw new ErrorServidor(`ERROR (Cod:${error.code}): ${error.message}`);
    }
};

export const agregarItem = async(item) => {
    try {
        const query = 'INSERT INTO productos (nombre, descripcion, precio, disponible) VALUES ($1, $2, $3, $4) RETURNING id'; 
        const resultado = await pool.query(query, Object.values(item));

        return resultado;

    } catch(error) {
        throw new ErrorServidor(`ERROR (Cod:${error.code}): ${error.message}`);
    }
};

export const eliminarItem = async(id) => {
    try {
        const query = 'DELETE FROM productos WHERE id=$1';
        const resultado = await pool.query(query, [id]);
        
        if (resultado.rowCount === 0) {
            // Lanzar Error si no se eliminó item
            throw new ErrorRecursosNoEncontrado(`Producto con ID: ${id} no encontrado para eliminación.`);
        }

        return resultado.rowCount;

    } catch(error) {
        if (error.statusCode === 404)
            throw error;
        
        throw new ErrorServidor(`ERROR (Cod:${error.code}): ${error.message}`);
    }
};

export const actualizarItem = async(id, item) => {
    try {
        const query = 'UPDATE productos SET nombre=$2, descripcion=$3, precio=$4, disponible=$5 WHERE id=$1';
        const resultado = await pool.query(query, [id, ...Object.values(item)]);
        
        if (resultado.rowCount === 0) {
            // Lanzar el error si no se actualizó item
            throw new ErrorRecursosNoEncontrado(`Producto con ID: ${id} no encontrado para actualización.`);
        }

        return resultado.rowCount;

    } catch(error) {
        if (error.statusCode === 404)
            throw error;
        
        throw new ErrorServidor(`ERROR (Cod:${error.code}): ${error.message}`);
    }
}