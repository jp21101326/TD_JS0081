// creado con function, pense que no se podian usar, entendi eso por la consulta realizada.
// Constantes
const PUNTAJE_VIDA_EXTRA = 100;
const MAXIMO_VIDAS = 5;
const PUNTAJE_MAXIMO = 500;

// Datos iniciales
let jugadores = [
    crearJugador("Juan"),
    crearJugador("Ana")
];

let rondas = [
    [50, 120, 100], 
    [80, 90, 110]
];

// Función para crear jugador
function crearJugador(nombre) {
    return {
        nombre,
        puntaje: 0,
        vidas: 3,
        nivel: 1,
        registro_partidas: []
    };
}

// Función para procesar una ronda de juego
function procesarRondas(jugador, rondasJugador) {
    console.log(`Bienvenido ${jugador.nombre}, empieza el juego!`);
    console.log("----------------------------------------------------");

    for (let i = 0; i < rondasJugador.length; i++) {
        let puntos = rondasJugador[i];
        console.log(`Ronda ${i + 1} - Puntos ganados: ${puntos}`);

        if (puntos < 0) {
            console.log("Puntos negativos no permitidos. Jugada ignorada.");
            continue;
        }

        jugador.puntaje += puntos;
        jugador.registro_partidas.push(jugador.puntaje);

        verificarNivel(jugador);
        verificarVidaExtra(jugador);
        verificarEstadoFinal(jugador);

        mostrarEstado(jugador);

        if (jugador.vidas <= 0 || jugador.puntaje >= PUNTAJE_MAXIMO) {
            break;
        }
    }
}

// Función para verificar cambio de nivel
function verificarNivel(jugador) {
    if (jugador.puntaje >= 400 && jugador.nivel === 2) {
        jugador.nivel++;
        console.log(`Nivel completado ${jugador.nombre}, subiste al nivel 3`);
    } else if (jugador.puntaje >= 200 && jugador.nivel === 1) {
        jugador.nivel++;
        console.log(`Nivel completado ${jugador.nombre}, subiste al nivel 2`);
    }
}

// Función para otorgar vidas extra
function verificarVidaExtra(jugador) {
    if (jugador.puntaje % PUNTAJE_VIDA_EXTRA === 0 && jugador.vidas < MAXIMO_VIDAS) {
        jugador.vidas++;
        console.log(`¡Bien hecho ${jugador.nombre}, ganaste una vida extra!`);
    }

    if (jugador.vidas > MAXIMO_VIDAS) {
        jugador.vidas = MAXIMO_VIDAS;
    }
}

// Función para verificar si el jugador ha terminado el juego
function verificarEstadoFinal(jugador) {
    if (jugador.vidas <= 0) {
        console.log(`Game Over ${jugador.nombre}, te quedaste sin vidas.`);
    }

    if (jugador.puntaje >= PUNTAJE_MAXIMO) {
        console.log(`🎉 Felicitaciones ${jugador.nombre}, alcanzaste el puntaje máximo.`);
    }
}

// Mostrar estado del jugador
function mostrarEstado(jugador) {
    console.log(`Estado actual de ${jugador.nombre}:`);
    console.log(`Puntaje: ${jugador.puntaje}`);
    console.log(`Vidas  : ${jugador.vidas}`);
    console.log(`Nivel  : ${jugador.nivel}`);
    console.log("------------------------------------------------------");
}

// Ejecución principal del juego
function iniciarJuego() {
    for (let i = 0; i < jugadores.length; i++) {
        procesarRondas(jugadores[i], rondas[i]);
    }
}

// Ejecutar
iniciarJuego();
