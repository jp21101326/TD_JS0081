import chalk from "chalk";

export const errorMiddleware = (err, req, res, next) => {
    // Delegar al manipulador de errores por defecto de Express, si los headers de la respuesta ya han sido enviados al cliente.
    if (res.headersSent) {
        console.error(
        chalk.redBright(
            "*** Error capturado por el manipulador de errores por defecto ***"
        )
        );
        return next(err);
    }

    // Determinar el estado y el mensaje
    let statusCode = 500;
    let message = `Error interno del servidor (${statusCode}).`;

    // Si es un NotFoundError o cualquier error con statusCode (ej. 404)
    // Si no tiene statusCode, se mantiene 500 y el mensaje genérico. 
    if (err.statusCode) { 
        statusCode = err.statusCode;
        message = err.message;
    }
        
    // Logear el error en consola
    console.error(chalk.redBright('*** Error de Servidor capturado por el middleware de errores ***'));
    console.error(chalk.redBright(err));
  
    res.status(statusCode).json({ error: message });
}