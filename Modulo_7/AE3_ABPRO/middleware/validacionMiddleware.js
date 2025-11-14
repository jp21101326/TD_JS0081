import { validarItem } from "../utils/validarItem.js";

// Middleware de Validación (para POST y PUT)
export const validarItemMdw = (req, res, next) => {
    const resultadoValidacion = validarItem(req.body);
    
    if (!resultadoValidacion.isValid) {
        // Si hay errores, responder con 400 Bad Request
        console.error("Error de validación (400):", resultadoValidacion.errors);
        return res.status(400).json({
            error: {
                message: `Error de validación de datos (${res.statusCode}).`,
                errors: resultadoValidacion.errors
            }
        });
    }
    
    // Si la validación es exitosa, pasar al siguiente middleware (o al handler de la ruta)
    next();
};