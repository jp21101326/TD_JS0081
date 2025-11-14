export function validarItem(item) {
    const errors = [];

    // Verificar si el objeto item existe
    if (!item || typeof item !== 'object') {
        errors.push("Los datos del item son inválidos o faltan.");
        return { isValid: false, errors };
    }

    // Verificar propiedad 'nombre'
    if (!item.nombre || typeof item.nombre !== 'string' || item.nombre.trim().length === 0) {
        errors.push("El nombre del item es obligatorio.");
    }

    // Verificar propiedad 'descripcion'
    if (!item.descripcion || typeof item.descripcion !== 'string' || item.descripcion.trim().length === 0) {
        errors.push("La descripcion es obligatoria.");
    }

    // Verificar propiedad 'precio'
    if (item.precio === undefined || item.precio === null || isNaN(Number(item.precio))) {
        errors.push("El precio es obligatorio y debe ser un número.");
    } else {
        const precio = Number(item.precio);
        if (precio <= 0) {
            errors.push("El precio debe ser un valor positivo.");
        }
    }

    // Verificar campo 'disponible'
    // Debe ser un booleano (true o false)
    if (item.disponible === undefined || item.disponible === null || typeof item.disponible !== 'boolean') {
        errors.push("La disponibilidad es obligatoria y debe ser un valor booleano (true o false).");
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}