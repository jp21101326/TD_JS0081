 class Tarea {
     constructor(nombre, estado = false, id) {
         this.nombre = nombre;
         this.estado = estado;
         this.id = id;
     }

     mostrarDetalles() {
         console.log(`Id : ${this.id} - Tarea : ${this.nombre} - Estado : ${this.estado ? "Completa" : "Pendiente"}`);
     }
 }

 class TareaImportante extends Tarea {
     constructor(nombre, estado, id, prioridad) {
       super(nombre, estado, id);
       this.prioridad = prioridad;
     }

     mostrarDetalles() {
       console.log(`Id : ${this.id} - Tarea : ${this.nombre} - Estado : ${this.estado ? "Completa" : "Pendiente"} - Prioridad : ${this.prioridad}`);
     }
 }

// Exportar clases
 export { Tarea, TareaImportante };


