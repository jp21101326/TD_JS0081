buscarLibrosPorAutor = async() => {
    // Obtener el valor del input de búsqueda
    const inputAutor = document.querySelector('#busqueda').value.toLowerCase().trim();
    const limite = 10;

    try {
        if(inputAutor === "") return;
        
        const cargando = document.querySelector('#cargando');
        const encabezadoBusqueda = document.querySelector('#encabezado-busqueda');
        
        limpiarBusqueda();
        cargando.hidden = false;
        
        // https://openlibrary.org/search.json?author=nombre_del_autor
        // https://covers.openlibrary.org/b/olid/cover_edition_key-M.jpg
        // https://covers.openlibrary.org/b/id/cover_i-M.jpg
        const resultado = await fetch(`https://openlibrary.org/search.json?author=${inputAutor}&language:spa`);

        // Verificar si la respuesta fue exitosa
        if (!resultado.ok) {
            // Si la respuesta no es OK, lanzar un error
            throw new Error(`Error en la respuesta HTTP: ${resultado.status} - ${resultado.statusText}`);
        }
        
        const datos = await resultado.json();
        const libros = datos.docs;
        
        cargando.hidden = true;

        const totalLibros = datos.numFound;

        // Mostrar mensaje si no se encontraron resultados
        if ( totalLibros === 0){
            mostrarSinResultados(inputAutor);
        } else {
            encabezadoBusqueda.textContent = `Resultados busqueda autor: "${inputAutor}" mostrando (${Math.min(limite, totalLibros)} / ${totalLibros})`;
            encabezadoBusqueda.hidden = false;
            mostrarCatalogo(libros.slice(0, limite));
        }

    } catch (error) {
        cargando.hidden = true;
        console.error(error);
        mostrarError(`Hubo un problema al buscar los libros. Por favor, inténtalo de nuevo más tarde. Detalles: ${error.message}`);
    }
}

// Mostrar lista de libros
mostrarCatalogo = (libros) => {
    const nodo_catalogo = document.querySelector('#catalogo');
    let contenido = '';

    // Crear cada card para cada libro en lista de libros
    libros.forEach(libro => {
        const numeroAutores = libro.author_name.length;
        
        if (numeroAutores === 1) autores = libro.author_name[0];
        else if (numeroAutores <= 10) autores = libro.author_name.join(", ");
        else autores = libro.author_name.slice(0,10).join(", ") + " y Otros";

        const src = libro.cover_i? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg` : "assets\\images\\avatar_book.png";
        
        contenido += `
            <div class="card mb-4 col-md-10 col-lg-8 mx-auto shadow">
                <div class="row g-0">
                    <div class="col-12 col-sm-2 col-lg-3 d-flex justify-content-center justify-content-sm-start py-3 py-sm-0">
                        <img src=${src} class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-sm-10 col-lg-9 pt-md-2 pt-lg-4">
                        <div class="card-body">
                            <h5 class="card-title">Título: ${libro.title}</h5>
                            <hr>
                            <p class="card-text">
                                <ul class="list-unstyled">
                                    <li><strong>Año Publicación:</strong> ${libro.first_publish_year}</li>
                                    <li><strong>Autor(es):</strong> ${autores}</li>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
            </div>    
        `;
    });
        
    // Insertar HTML en el nodo del DOM
    nodo_catalogo.innerHTML = contenido;
}

// Función para mostrar mensajes de error
mostrarError = (mensaje) => {
    const nodo_catalogo = document.querySelector('#catalogo');
    
    // Eliminar cualquier error previo
    limpiarErrores();

    const divError = document.createElement('div');
    divError.className = 'alert alert-danger text-center w-100';
    divError.role = 'alert';
    divError.id = 'mensaje-error';
    divError.innerHTML = `
        <h4 class="alert-heading">Error en la búsqueda</h4>
        <p>${mensaje}</p>
    `;
    
    // Insertar el mensaje de error en el catálogo
    nodo_catalogo.appendChild(divError);
}

// Función para limpiar errores en el catálogo
limpiarErrores = () => {
    const errorExistente = document.querySelector('#mensaje-error');
    if (errorExistente) {
        errorExistente.remove();
    }
}

// Función para mostrar mensaje cuando no hay resultados
mostrarSinResultados = (autor) => {
    const nodo_catalogo = document.querySelector('#catalogo');
    
    nodo_catalogo.innerHTML = `
        <div class="w-100">
            <div class="alert alert-warning text-center" role="alert">
                <h4 class="alert-heading">Sin resultados</h4>
                <p>No se encontraron libros asociados al Autor: "<strong>${autor}</strong>"</p>
            </div>
        </div>
    `;
}

// Función para limpiar búsqueda y mostrar todos los libros
limpiarBusqueda = () => {
    document.querySelector('#busqueda').value = '';              // Limpiar input text busqueda
    document.querySelector('#catalogo').innerHTML = '<img src="assets/images/banner_oldbooks.jpg" alt="oldbooks" class="w-100">'; // Limpiar cards libros y poner imagen
    document.querySelector('#encabezado-busqueda').hidden = true;// Esconder encabezado
}