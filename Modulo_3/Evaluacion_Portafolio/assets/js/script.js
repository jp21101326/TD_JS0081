 $('#definiciones').hide();


// Arreglo global para almacenar las tareas
   let tareas = [];

// Mostrar la fecha actual (usando el objeto Date)
   const fechaActual = new Date();
   document.getElementById("fecha").textContent = "Hoy es: " + fechaActual.toLocaleDateString();

// Agregar tareas
   function agregarTarea() {
       const input   = document.getElementById("nuevaTarea");
       const mensaje = document.getElementById("mensaje");
       let texto     = input.value.trim(); 

       if (texto === "") {
         /* mensaje.textContent = "Ingrese Descripción de Taera por favor, campo no puede estar vacío."; */
         mostrarAviso('Ingrese Descripción de Taera por favor, campo no puede estar vacío.', 'warning'); 
         return;
       }

       mensaje.textContent = ""; 
       const nueva = {
         id: Math.floor(Math.random() * 10000), 
         texto: texto,
         fechaCreacion: obtenerFecha()
       };

       tareas.push(nueva); 
       input.value = ""; 
       mostrarTareas();
       mostrarAviso('Tarea agregada exitosamente', 'success'); 
   }

// Mostrar tareas
   function mostrarTareas2() {
       const lista = document.getElementById("listaTareas");
       lista.innerHTML = "";

       tareas.forEach((tarea) => {
           let item = document.createElement("li");
           item.textContent = tarea.texto;
           item.title = "Haz clic para eliminar";
           item.onclick = function () {
               eliminarTarea(tarea.id);
           };
           lista.appendChild(item);
       });
   }

   function mostrarTareas() {
           taskList.innerHTML = '';
            
           if (tareas.length === 0) {
               emptyState.style.display = 'block';
               return;
           }
            
           emptyState.style.display = 'none';
           tareas.forEach(tarea => {
               const li = document.createElement('li');
               li.className = 'task-item';
               li.setAttribute('role', 'listitem');
               li.innerHTML = `
                   <span class="task-id">#${tarea.id}</span>
                   <div class="task-content">
                       <div class="task-text">${tarea.texto}</div>
                       <div class="task-date">Creada: ${tarea.fechaCreacion}</div>
                   </div>
                   <button 
                       class="delete-btn mi-button" 
                       onclick="eliminarTarea(${tarea.id})"
                       aria-label="Eliminar tarea: ${tarea.texto}"
                    >
                    Eliminar
                  </button>
                `;
                
                taskList.appendChild(li);
            });
     }



// Eliminar una tarea por su ID
   function eliminarTarea(id) {
        const index = tareas.findIndex(t => t.id === id);
        if (index !== -1) {
            tareas.splice(index, 1);
            mostrarTareas();
            mostrarAviso('Tarea Eliminada exitosamente', 'success');  
        } else {
            mostrarAviso('No se encontró la tarea', 'warning');
        }
   }

   function obtenerFecha() {
       const fecha = new Date();
       return fecha.toLocaleDateString('es-ES', {
           year: 'numeric',
           month: 'long',
           day: 'numeric',
           hour: '2-digit',
           minute: '2-digit'
       });
   }

   function mostrarAviso(texto, tipo) {
           mensaje.textContent = texto;
           mensaje.className = `mensaje ${tipo}`;
           mensaje.style.display = 'block';
           setTimeout(() => {
               mensaje.style.display = 'none';
           }, 3000);
   }


