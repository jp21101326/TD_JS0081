// ==========================
// PUNTOS 1 al 6
// ==========================

// 1.- Definir variables usando let, const y var:
let tareas = [];
var IdTarea = 0; 

// 2.- Funciones usando Arrow Functions:
// 3.- Parámetros por defecto:
const agregarTarea = (nombre, estado = false) => {
     const nuevaTarea = {
         id: IdTarea++, 
         //id: tareas.length + 1,
         nombre,
         estado
     };
     tareas = [...tareas, nuevaTarea];
};

// 4.- Interpolación de strings:
// 5.- Destructuring de objetos y arrays:
const mostrarTareas = () => {
     tareas.forEach(({ id, nombre, estado }) => {
         console.log(`ID: ${id} - Tarea: ${nombre} - Estado: ${estado ? "Completa" : "Pendiente"}`);
     });
};

// 6.- Operador Spread y Rest:
/* una forma alternativa de eliminar tareas usando el operador rest
const eliminarTarea = (...indices) => {
    tareas = tareas.filter((tarea, index) => !indices.includes(index));
};
*/
const eliminarTarea = (...indices) => {
     for (let i of indices.sort((a, b) => b - a)) {
         if (i >= 0 && i < tareas.length) {
             tareas.splice(i, 1);
         }
     }
};


// Exportar funciones para su uso en otros módulos
export { agregarTarea, mostrarTareas, eliminarTarea, tareas };
