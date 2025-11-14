export class ErrorServidor extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = 'ServerError';
        this.statusCode = 500; // Propiedad clave para el middleware
    }
}

export class ErrorRecursosNoEncontrado extends Error {
    constructor(mensaje) {
        super(`Recurso no encontrado (Cod. 404). ${mensaje}`);
        this.name = 'NotFoundError';
        this.statusCode = 404; // Propiedad clave para el middleware
    }
}