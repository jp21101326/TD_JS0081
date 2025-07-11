// Sistema de puntuación de un juego con objetos y múltiples jugadores

// Constantes
const puntaje_vida_extra = 100;
const maximo_vidas       = 5;
const puntaje_maximo     = 500;

// jugadores 
let jugadores = [
    {
        nombre: "Juan",
        puntaje: 0,
        vidas: 3,
        nivel: 1,
        registro_partidas: []
    },
    {
        nombre: "Ana",
        puntaje: 0,
        vidas: 3,
        nivel: 1,
        registro_partidas: []
    }
];

// punto para tres rondas
let rondas = [
    [50, 120, 100], 
    [80,  90, 110]  
];

// inicio de ciclo 
for (let i = 0; i < jugadores.length; i++) {
     let jugador = jugadores[i];
     console.log("Bienvenido " + jugador.nombre + ", empieza el juego!");
     console.log("----------------------------------------------------");

     for (let ronda = 0; ronda < rondas[i].length; ronda++) {
             let puntos_ganados = rondas[i][ronda];
             console.log("Ronda " + (ronda + 1) + " - Puntos ganados: " + puntos_ganados);

             if (puntos_ganados < 0) {
                 console.log("Puntos negativos no permitidos. Jugada ignorada.");
                 continue;
             }

             jugador.puntaje += puntos_ganados;
             jugador.registro_partidas.push(jugador.puntaje);

             if (jugador.puntaje >= 200 && jugador.nivel === 1) {
                 jugador.nivel++;
                 console.log("Nivel completado " + jugador.nombre + " acabas de subir al nivel 2");
             } else if (jugador.puntaje >= 400 && jugador.nivel === 2) {
                 jugador.nivel++;
                 console.log("Nivel completado " + jugador.nombre + " acabas de subir nivel 3");
             }

             // Vida extra si el puntaje es múltiplo de 100
             if (jugador.puntaje % puntaje_vida_extra === 0 && jugador.vidas < maximo_vidas) {
                 jugador.vidas++;
                 console.log("Bien hecho " + jugador.nombre + " ganaste una vida extra.");
             }

             if (jugador.vidas > maximo_vidas) {
                 jugador.vidas = maximo_vidas;
             }

             if (jugador.vidas <= 0) {
                 console.log("Game Over " + jugador.nombre + " te quedaste sin vidas.");
                 break;
             }

             if (jugador.puntaje >= puntaje_maximo) {
                 console.log("Felicitaciones " + jugador.nombre + " alcanzaste el puntaje máximo.");
             }

         // Mostrar estado del jugador
         console.log("Estado actual de " + jugador.nombre + ":");
         console.log("Puntaje: " + jugador.puntaje);
         console.log("Vidas  : " + jugador.vidas);
         console.log("Nivel  : " + jugador.nivel);
         console.log("------------------------------------------------------");
     }
}
