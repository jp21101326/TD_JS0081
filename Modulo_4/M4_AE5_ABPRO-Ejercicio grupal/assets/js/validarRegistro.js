const errores = [];
const boton_registro = document.getElementById('btn-registrarse'); 

boton_registro.addEventListener('click', function(event) {
    event.preventDefault(); // Prevenir comportamiento por defecto
    validar_formulario();
});

// Funciones de validación del formulario de registro
function validar_formulario() {
    // Obtener valores de los campos
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("pass").value;

    // Limpiar errores
    limpiar_errores();
 
    // Ejecutar todas las validaciones (sin hacer return early)
    const nombre_valido = validar_nombre(nombre);
    const email_valido = validar_email(email);
    const password_valido = validar_password(password);
    
    // Determinar si el formulario es válido
    const es_valido = nombre_valido && email_valido && password_valido;
    
    // Mostrar resultado de la validación
    if (es_valido) {
        mostrar_exito();
        return true;
    } else {
        mostrar_errores();
        return false;
    }
}

function validar_nombre(nombre) {
    const campo = document.getElementById("nombre");
        
    if (nombre === '') {
        agregar_error(campo, 'El nombre es obligatorio');
        return false;
    }
    
    if (nombre.length < 2) {
        agregar_error(campo, 'El nombre debe tener al menos 2 caracteres');
        return false;
    }
    
    if (nombre.length > 50) {
        agregar_error(campo, 'El nombre no puede exceder 50 caracteres');
        return false;
    }
    
    // Validar que solo contenga letras, espacios y algunos caracteres especiales
    const patron_nombre = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s'-]+$/;
    if (!patron_nombre.test(nombre)) {
        agregar_error(campo, 'El nombre solo puede contener letras, espacios, apostrofes y guiones');
        return false;
    }
    
    mostrar_valido(campo);
    return true;
}

function validar_email(email) {
    const campo = document.getElementById("email");
       
    if (email === '') {
        agregar_error(campo, 'El correo electrónico es obligatorio');
        return false;
    }
    
    // Patrón para validar email
    const patron_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patron_email.test(email)) {
        agregar_error(campo, 'Ingresa un correo electrónico válido');
        return false;
    }
        
    mostrar_valido(campo);
    return true;
}

function validar_password(password) {
    const campo = document.getElementById("pass");
        
    if (password === '') {
        agregar_error(campo, 'La contraseña es obligatoria');
        return false;
    }
    
    if (password.length < 6) {
        agregar_error(campo, 'La contraseña debe tener al menos 6 caracteres');
        return false;
    }
        
    // Validar que contenga al menos una letra y un número
    const tiene_letra = /[a-zA-Z]/.test(password);
    const tiene_numero = /[0-9]/.test(password);
    
    if (!tiene_letra || !tiene_numero) {
        agregar_error(campo, 'La contraseña debe contener al menos una letra y un número');
        return false;
    }
    
    mostrar_valido(campo);
    return true;
}

// Función para agregar errores
function agregar_error(campo, mensaje) {    
    // Agregar clase al campo
    campo.classList.add('is-invalid');
    campo.classList.remove('is-valid');
    
    // Actualizar lista de errores
    errores.push(mensaje);
}

// Funcion para marcar un campo como válido
function mostrar_valido(campo) {
    campo.classList.add('is-valid');
    campo.classList.remove('is-invalid');
}

// Función para mostrar mensajes de error
function mostrar_errores() {
    let formulario = document.getElementById("registro");
    let contenido = '';        
    
    mensaje_error = document.createElement('div');
    mensaje_error.className = 'invalid-feedback d-block border border-danger';
    formulario.appendChild(mensaje_error);

    errores.forEach(error =>{
        contenido += `<p>${error}</p>`
    });

    mensaje_error.innerHTML = contenido;
}

// Función para mostrar mensaje de éxito
function mostrar_exito() {
    const formulario = document.getElementById('registro');
    
    // Crear mensaje de éxito
    const mensaje_exito = document.createElement('div');
    mensaje_exito.className = 'alert alert-success mt-3';
    mensaje_exito.innerHTML = `
        <h4 class="alert-heading">¡Registro exitoso!</h4>
        <p>Todos los campos han sido validados correctamente.</p>
        <hr>
        <p class="mb-0">Los datos ingresados son válidos y el formulario está listo para ser procesado.</p>
        <button class="btn bg-success fw-medium my-3 text-light w-100" type="button" onclick="limpiar_exito()">OK</button>
    `;
    
    formulario.appendChild(mensaje_exito);
}

// Función para limpiar el formulario exitoso
function limpiar_exito() {
    const campos = ['nombre', 'email', 'pass'];
    
    campos.forEach(campo =>{
        nodo = document.getElementById(campo);
        nodo.value = '';
        nodo.classList.remove('is-valid');
    });
    
    document.querySelector('.alert-success').remove();
}

// Función para limpiar errores formulario
function limpiar_errores() {
    errores.length = 0;
    bloque_errores = document.querySelector('.invalid-feedback');

    if(bloque_errores){
        bloque_errores.remove();
    }
}