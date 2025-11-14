// ==================================================
// Fase 1.- Configuración de clases y objetos
// ==================================================

class Tarea {
   constructor(id, titulo, descripcion, completada = false) {
       this.id = id;
       this.titulo = titulo;
       this.descripcion = descripcion;
       this.completada = completada;
   }

   mostrarDetalles() {
       console.log(`ID         : ${this.id}`);
       console.log(`Título     : ${this.titulo}`);
       console.log(`Descripción: ${this.descripcion}`);
       console.log(`Completada : ${this.completada}`);
   }
}

// Clase que maneja la lista de tareas
class ListaTareas {
   constructor() {
         this.tareas = [];
   }

   agregarTarea(tarea) {
         this.tareas.push(tarea);
   }

   eliminarTarea(id) {
         this.tareas = this.tareas.filter(t => t.id !== id);
   }

   marcarComoCompletada(id) {
         const tarea = this.tareas.find(t => t.id === id);
         if (tarea) tarea.completada = true;
   }

   mostrarTareas() {
       console.log("----------------");
       console.log("Tareas actuales:");
       console.log("----------------");
       this.tareas.forEach(t => t.mostrarDetalles());
   }
}

// ==================================================
// Fase 2: Interacción con el DOM y manejo de eventos
// ==================================================
const lista            = new ListaTareas();
const formTarea        = document.getElementById("formTarea");
const inputTitulo      = document.getElementById("titulo");
const inputDescripcion = document.getElementById("descripcion");
const listaTareasDiv   = document.getElementById("listaTareas");

// ==================================================
// Fase 3: Consumo de API externa con fetch o XHR
// ==================================================

// Renderiza todas las tareas en tarjetas visuales
function renderizarTareas() {
     listaTareasDiv.innerHTML = "";

    if (lista.tareas.length === 0) {
        listaTareasDiv.innerHTML = `
            <div class="w-100">
                <div class="alert alert-info text-center" role="alert">
                    No hay tareas para mostrar.
                </div>
            </div>
        `;
        return; 
    }

    lista.tareas.forEach(tarea => {
        const card = document.createElement("div");
         card.className = "col";

         const bgClase = tarea.completada ? "bg-success bg-opacity-25" : "bg-light";
         const portada = tarea.completada
           ? "./assets/img/finalizada.webp"
           : "./assets/img/pendiente3.png";

         card.innerHTML = `
         <div class="card ${bgClase} h-100">
             <div class="row g-0 h-100">
                 <div class="col-12 col-sm-4 col-md-4 d-flex justify-content-center align-items-center">
                     <img src="${portada}" class="img-fluid rounded-start" style="width: 100px; height: auto; object-fit: contain;" alt="Portada de ${tarea.titulo}">
                 </div>   
                 <div class="col-12 col-sm-8 col-md-8">
                    <div class="card-body d-flex flex-column justify-content-between h-100">
                        <div>
                             <h5 class="card-title">ID: ${tarea.id}</h5>
                             <p class="card-text" style="text-align: justify;"><strong>Título: ${tarea.titulo}</strong></p>
                             <p class="card-text" style="text-align: justify;">Descripción: ${tarea.descripcion}</p>
                        </div>
                        <div class="d-flex justify-content-between mt-2 flex-wrap gap-2">
                             ${tarea.completada ? "" : `<button class="btn btn-success btn-sm" data-id="${tarea.id}">Completada</button>`}
                             ${tarea.completada ? "" : `<button class="btn btn-info btn-sm" data-id="${tarea.id}">Editar</button>`}
                             <button class="btn btn-danger btn-sm" data-id="${tarea.id}">Eliminar</button>
                        </div>
                    </div>
                 </div>
             </div>
         </div>
         `;
         listaTareasDiv.appendChild(card);
     });
}

// ==================================================
// Fase 4: Integración y pruebas
// ==================================================
const API_URL = "https://jsonplaceholder.typicode.com/todos"; 
const API_URL_DATOS = "https://jsonplaceholder.typicode.com/posts";

// Obtener tareas desde la API al iniciar
async function obtenerTareasAPI() {
     try {
         const res = await fetch(API_URL_DATOS + "?_limit=6");
         const data = await res.json();
         data.forEach(item => {
             const tarea = new Tarea(item.id, item.title, item.body, false);
             lista.agregarTarea(tarea);
         });

         renderizarTareas();
     } catch (err) {
         Swal.fire({
             title: "Error!",
             text: "Error al obtener tareas...",
             icon: "error"
         });
     }
}

// Agregar tarea a la API y lista
async function agregarTareaAPI(tareaData) {
     try {
         const res = await fetch(API_URL_DATOS, {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify(tareaData)
         });
         const data = await res.json();
         const nuevoId = generarNuevoId(lista.tareas);
         const nuevaTarea = new Tarea(nuevoId, data.title, data.body || tareaData.descripcion, false || tareaData.completada);
         lista.agregarTarea(nuevaTarea);
         MostrarAviso("Tarea Agregada Exitosamente...", "success");
         renderizarTareas();
     } catch (err) {
         Swal.fire({
             title: "Error!",
             text: "Error al agregar tarea...",
             icon: "error"
         });
     }
}

// Marcar tarea como completada en API y lista
async function marcarCompletadaAPI(id) {
     try {
         const tarea = lista.tareas.find(t => t.id === id);
         if (!tarea) return;

         await fetch(`${API_URL_DATOS}/${id}`, {
           method: "PUT",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ ...tarea, completed: true })
         });

         lista.marcarComoCompletada(id);
         renderizarTareas();
     } catch (err) {
         Swal.fire({
             title: "Error!",
             text: "Error al actualizar tarea...",
             icon: "error"
         });         
     }  
}

// Eliminar tarea en API y lista
async function eliminarTareaAPI(id) {
     try {
         await fetch(`${API_URL_DATOS}/${id}`, { method: "DELETE" });
         lista.eliminarTarea(id);
         MostrarAviso("Tarea Eliminada Exitosamente...", "success");
         renderizarTareas();
     } catch (err) {
         Swal.fire({
             title: "Error!",
             text: "Error al eliminar tarea...",
             icon: "error"
         });  
     }
}

async function editarTarea(id, nuevoTitulo, nuevaDescripcion) {
     try {
        const tareaEditada = {
            id: id,
            title: nuevoTitulo,
            body: nuevaDescripcion,
            userId: 1
        };

        const res = await fetch(`${API_URL_DATOS}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tareaEditada)
        });

        const data = await res.json();
        //console.log("Tarea editada:", data);
        Swal.fire({
           title: "Tarea editada:",
           text: "Grabación Exitosa...",
           icon: "success"
        });

        // Actualizamos la lista local
        const tarea = lista.tareas.find(t => t.id == id);
        tarea.titulo = nuevoTitulo;
        tarea.descripcion = nuevaDescripcion;

        renderizarTareas();
     } catch (error) {
         Swal.fire({
             title: "Error!",
             text: "Error al editar tarea...",
             icon: "error"
         });
     }
}

function generarNuevoId(listaTareas) {
     return listaTareas.length > 0
        ? Math.max(...listaTareas.map(t => t.id)) + 1
        : 1;
}


// ==================================================
// Eventos
// ==================================================
function MostrarAviso(mensaje, icono){
         Swal.fire({
             title: mensaje,
             draggable: true,
             icon: icono
         });
}


// Formulario para agregar tarea
formTarea.addEventListener("submit", async (e) => {
     e.preventDefault();
     const title = inputTitulo.value.trim();
     const body = inputDescripcion.value.trim();
     const userId = 1;
     if (!title || !body) return;

     await agregarTareaAPI({ title, body, userId});

     inputTitulo.value = "";
     inputDescripcion.value = "";
});

// Delegación de eventos para botones de tareas listadas
listaTareasDiv.addEventListener("click", (e) => {
     const id = parseInt(e.target.dataset.id);
     if (e.target.textContent === "Completada") {
         marcarCompletadaAPI(id);
     } else if (e.target.textContent === "Eliminar") {
         eliminarTareaAPI(id);
     } else if (e.target.textContent === "Editar") {
         const tarea = lista.tareas.find(t => t.id == id);
         document.getElementById("editarId").value = tarea.id;
         document.getElementById("editarTitulo").value = tarea.titulo;
         document.getElementById("editarDescripcion").value = tarea.descripcion;
         modalEditar.show();
     }
});

// Guardar cambios desde el modal
document.getElementById("guardarEdicion").addEventListener("click", () => {
     const id = document.getElementById("editarId").value;
     const nuevoTitulo = document.getElementById("editarTitulo").value;
     const nuevaDescripcion = document.getElementById("editarDescripcion").value;
     editarTarea(id, nuevoTitulo, nuevaDescripcion);
     modalEditar.hide()
});

// Inicializar modal de Bootstrap
const modalEditar = new bootstrap.Modal(document.getElementById('modalEditarTarea'));

// ==================================================
// Inicialización
// ==================================================
document.addEventListener("DOMContentLoaded", () => {
   obtenerTareasAPI();
});


