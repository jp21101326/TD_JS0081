export const accion = (tiempoMin, tiempoMax) => {
    const porcFracaso = 20;
    return new Promise ((resolve, reject) => {
        if (Math.floor(Math.random() * 100 + 1) <= porcFracaso){
            reject(`Acción fracasó:`);
        } else {
            const duracion = 1000 * (Math.random() * (tiempoMax - tiempoMin) + tiempoMin);
            setTimeout(() => resolve(duracion), duracion);
        } 
    });
}