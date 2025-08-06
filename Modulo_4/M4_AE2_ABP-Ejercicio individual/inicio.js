/// ==========================
// PUNTOS 9 al 11 (Integración)
// ==========================
import { agregarTarea, mostrarTareas, eliminarTarea, tareas } from "./tareas.js";
import { Tarea, TareaImportante } from "./clases.js";

// --- funciones básicas ---
console.log("-----------------------------------------------------------------");
console.log("/ Desarrollo Puntos 1 al 6 ");
console.log("-----------------------------------------------------------------");
console.log("/ * Agregando Tareas .... ");
agregarTarea("M4_AE1_ABP-Ejercicio individual",true);
agregarTarea("M4_AE1_Quiz",true);
agregarTarea("M4_AE2_ABP-Ejercicio individual");
agregarTarea("M4_AE2_Quiz", true);
console.log("/ * Mostrando Tareas .... ");
mostrarTareas();
console.log("/ * Eliminar Tarea .... ");
eliminarTarea(0);
console.log("/ * Tarea Eliminada ... ");
mostrarTareas();

// 7.- Clases y Herencia:
console.log("/-----------------------------------------------------------------");
console.log("/ Desarrollo Puntos 7 y 8 ");
console.log("/-----------------------------------------------------------------");
const tarea1 = new Tarea("M4_AE3_ABP-Ejercicio individual", false,1);
const tarea2 = new TareaImportante("Examen Desarrollo de Aplicaciones Full Stack JavaScript", false, 2, "Alta");
tarea1.mostrarDetalles();
tarea2.mostrarDetalles();

// 9.- Sets y Maps:
console.log("/-----------------------------------------------------------------");
console.log("/ Desarrollo Punto 9: Sets y Maps ");
console.log("/-----------------------------------------------------------------");
const tareasCompletadas = new Set();
const mapaTareas = new Map();
mapaTareas.set(tarea1.id, tarea1);
mapaTareas.set(tarea2.id, tarea2);
if (tarea2.estado) tareasCompletadas.add(tarea2);

console.log("-- Tareas en Map ---");
for (let [id, tarea] of mapaTareas) {
    console.log(`Clave: ${id}`);
    tarea.mostrarDetalles();
}
console.log("-- Tareas completadas en Set ---");
for (let tarea of tareasCompletadas) {
    tarea.mostrarDetalles();
}

// 10.- Iteradores y Generadores:
console.log("/-----------------------------------------------------------------");
console.log("/ Desarrollo Punto 10: Generador ");
console.log("/-----------------------------------------------------------------");
function* generadorTareas() {
    let index = 0;
    for (let tarea of mapaTareas.values()) {
        yield { index, tarea };
        index++;
    }
}
for (let item of generadorTareas()) {
    console.log(`Iterador índice ${item.index}:`);
    item.tarea.mostrarDetalles();
}

// 11.- Promesas: async y await:
console.log("/-----------------------------------------------------------------");
console.log("/ Desarrollo Punto 11: Async/Await ");
console.log("/-----------------------------------------------------------------");
const cargarTareasAsync = async () => {
    const promesa = new Promise((resolve) => {
        setTimeout(() => {
            resolve([...mapaTareas.values()]);
        }, 1000);
    });

    const tareasCargadas = await promesa;
    console.log("-- Tareas cargadas servidor ---");
    tareasCargadas.forEach(t => t.mostrarDetalles());
};
cargarTareasAsync();
