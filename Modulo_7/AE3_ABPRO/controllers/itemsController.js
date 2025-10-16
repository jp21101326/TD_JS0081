import { listarItems, agregarItem, actualizarItem, eliminarItem } from "../model/item.js";

export const verItems = async (req, res) => {
    const items = await listarItems();

    // Respuesta exitosa con contenido (200)
    return res.status(200).json({
        items : items
    });
}

export const crearItem = async (req, res) => {
    const resultado = await agregarItem(req.body);

    // Creación exitosa (201)
    return res.status(201).json({
        id : resultado.rows[0].id,
        itemsAgregados : resultado.rowCount
    });
}

export const modificarItem = async (req, res) => {
    const filasActualizadas = await actualizarItem(req.params.id, req.body);

    // Respuesta exitosa con contenido (200)
    return res.status(200).json({
        filasActualizadas : filasActualizadas
    });
}

export const borrarItem = async (req, res) => {
    const filasEliminadas = await eliminarItem(req.params.id, req.body);

    // Respuesta exitosa con contenido (200)
    return res.status(200).json({
        filasEliminadas : filasEliminadas
    });
}
