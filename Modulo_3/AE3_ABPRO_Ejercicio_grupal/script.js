
// AE3_ABPRO-Ejercicio grupal  - SALA 2
// ----------------------------------------------------
// #1 - CREAR UN OBJETO CLIENTE
// ----------------------------------------------------
const cliente = {
    id: Number,
    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    activo: Boolean,
};


// ----------------------------------------------------
// # 2 - CREAR UN ARREGLO DE OBJETOS CLIENTE
// ----------------------------------------------------
console.log('----------------------------------------');
console.log('# 2 - CREAR UN ARREGLO DE OBJETOS CLIENT');
console.log('----------------------------------------');
let clientes = [];

clientes.push({
    id: 1,
    nombre:   'Juan',
    apellido: 'Pérez',
    email:    'juan.perez@example.com',
    telefono: '123456789',
    activo:   true,
});

clientes.push({
    id: 2,
    nombre:   'María',
    apellido: 'Gómez',
    email:    'maria.gomez@example.com',
    telefono: '987654321',
    activo:   false,
});

clientes.push({
    id: 3,
    nombre:   'Luis',
    apellido: 'Martínez',
    email:    'luis.martinez@example.com',
    telefono: '456789123',
    activo:   true,
});


// --------------------------------------------------------------
// #3 ACCEDER A INFORMACIÓN DE CLIENTES
// --------------------------------------------------------------
console.log('----------------------------------------------------');
console.log('#3 ACCEDER A INFORMACIÓN DE CLIENTES');
console.log('----------------------------------------------------');
function mostrarInformacion() {
    for (let i = 0; i < clientes.length; i++) {
        const c = clientes[i];
        console.log(`ID: ${c.id} | Nombre: ${c.nombre} ${c.apellido} | Email: ${c.email} | Teléfono: ${c.telefono} | Activo: ${c.activo ? 'Sí' : 'No'}`);
    }
}
mostrarInformacion();


// -----------------------------------
// #3 VERSIÓN 2 SIN FUNCTION
// -----------------------------------
console.log('-------------------------');
console.log('#3 VERSIÓN 2 SIN FUNCTION');
console.log('-------------------------');
for (let i = 0; i < clientes.length; i++) {
    console.log(`
	cliente ${clientes[i].id}
	nombre: ${clientes[i].nombre}
	apellido: ${clientes[i].apellido}
	email: ${clientes[i].email}
	teléfono: ${clientes[i].telefono}
    `);
}


// ---------------------------------------------------
// #4 CONTAR LA CANTIDAD DE CLIENTES ACTIVOS
// ---------------------------------------------------
console.log('-----------------------------------------');
console.log('#4 CONTAR LA CANTIDAD DE CLIENTES ACTIVOS');
console.log('-----------------------------------------');
function contarActivos() {
    let clientesActivos = 0;
    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].activo) {
            clientesActivos++;
        }
    }
    console.log('Número de clientes activos: ' + clientesActivos);
}
contarActivos();


// --------------------------------------------------------------
// #5 AGREGAR UN NUEVO CLIENTE
// --------------------------------------------------------------
console.log('----------------------------------------------------');
console.log('#5 AGREGAR UN NUEVO CLIENTE');
console.log('----------------------------------------------------');
function agregarCliente(nombre, apellido, email, telefono, activo) {
     // como obtener el id y ponerlo adecuadamente sin preguntar con prompt?
     let id = clientes.length + 1;
     clientes.push({ id, nombre, apellido, email, telefono, activo });
     console.log("Cliente agregado exitosamente!!");
     console.log("-------------------------------");
}

agregarCliente('Rodrigo', 'Martínez', 'rodrigo.martinez@example.com', '123456789', false);
console.table(clientes);


// --------------------------------------------------------------
// #6 ELIMINAR UN CLIENTE POR ID
// --------------------------------------------------------------
console.log('----------------------------------------------------');
console.log('#6 ELIMINAR UN CLIENTE POR ID');
console.log('----------------------------------------------------');
function eliminarPorID(id) {
    const index = clientes.findIndex((cliente) => cliente.id === id);
    if (index !== -1) {
        clientes.splice(index, 1);
        console.log(`Cliente con ID ${id} eliminado.`);
    } else {
        console.log(`Cliente con ID ${id} no encontrado.`);
    }
}

eliminarPorID(2);
mostrarInformacion();


// --------------------------------------------------------------
// #7 MODIFICAR UN CLIENTE
// --------------------------------------------------------------
console.log('----------------------------------------------------');
console.log('#7 MODIFICAR UN CLIENTE');
console.log('----------------------------------------------------');
function modificarCliente(id, clienteModificado) {
    const index = clientes.findIndex((cliente) => cliente.id === id);
    if (index !== -1) {
        // Aquí puedes modificar las propiedades directamente
        if (clienteModificado.nombre !== undefined) clientes[index].nombre = clienteModificado.nombre;
        if (clienteModificado.apellido !== undefined) clientes[index].apellido = clienteModificado.apellido;
        if (clienteModificado.email !== undefined) clientes[index].email = clienteModificado.email;
        if (clienteModificado.telefono !== undefined) clientes[index].telefono = clienteModificado.telefono;
        if (clienteModificado.activo !== undefined) clientes[index].activo = clienteModificado.activo;
        console.log(`Cliente con ID ${id} modificado.`);
    } else {
        console.log(`Cliente con ID ${id} no encontrado.`);
    }
}

modificarCliente(1, {
    nombre: 'Lucia',
    apellido: 'Sepúlveda',
    email: 'lucia.sepulveda@example.com',
    telefono: '111222333',
    activo: false,
});
mostrarInformacion();


// --------------------------------------------------------------
// #8 CONSULTAR CLIENTES INACTIVOS
// --------------------------------------------------------------
console.log('----------------------------------------------------');
console.log('#8 CONSULTAR CLIENTES INACTIVOS');
console.log('----------------------------------------------------');
function consultarInactivos() {
    const inactivos = clientes.filter((cliente) => !cliente.activo);
    if (inactivos.length > 0) {
        console.log('Clientes inactivos:');
        inactivos.forEach((cliente) => {
            console.log(`ID: ${cliente.id}, Nombre: ${cliente.nombre} ${cliente.apellido}`);
        });
    } else {
        console.log('No hay clientes inactivos.');
    }
}

consultarInactivos();

// ----------------------------------------------------
// #8 ALTERNATIVA 2
// ----------------------------------------------------
console.log('----------------');
console.log('#8 ALTERNATIVA 2');
console.log('----------------');
let nuevoArreglo = clientes.filter((cliente) => cliente.activo === false);
console.table(nuevoArreglo);


// --------------------------------------------------------------
// #9  FUNCIÓN PARA UNIR ARREGLOS DE CLIENTES
// --------------------------------------------------------------
console.log('----------------------------------------------------');
console.log('#9 FUNCIÓN PARA UNIR ARREGLOS DE CLIENTES');
console.log('----------------------------------------------------');
function unirClientes(nuevosClientes) {
    if (Array.isArray(nuevosClientes)) {
        clientes = [...clientes, ...nuevosClientes];
        console.log('Clientes unidos exitosamente.');
    } else {
        console.log('El argumento debe ser un arreglo de clientes.');
    }
}

unirClientes([
    {
        id: 5,
        nombre: 'Pedro',
        apellido: 'Sánchez',
        email: 'pedro.sanchez@example.com',
        telefono: '654321987',
        activo: true,
    },
]);
mostrarInformacion();


// --------------------------------------------------------------
// #9 FILTRAR CLIENTES ÚNICOS (SACAR LOS DUPLICADOS)
// --------------------------------------------------------------
console.log('----------------------------------------------------');
console.log('#9 FILTRAR CLIENTES ÚNICOS (SACAR LOS DUPLICADOS)');
console.log('----------------------------------------------------');
function filtrarClientesUnicos(lista = []) {
    const map = new Map();
    lista.forEach((cliente) => {
        if (!map.has(cliente.id)) {
            map.set(cliente.id, cliente);
        }
    });
    return Array.from(map.values());
}

clientes = filtrarClientesUnicos(clientes);
console.log('Clientes únicos:', clientes);


// ----------------------------------------------------------------------------------------------
// #10 CICLO WHILE PARA CONSULTAR DATOS DE CLIENTE HASTA OBTENER ID VÁLIDO CON PROMPT
// ----------------------------------------------------------------------------------------------
//function buscarCliente() {
//   let idValido = false;
//    let cliente;
//    while (!idValido) {
//       const entrada = prompt('Ingrese el ID del cliente:');
//        const id = parseInt(entrada);
//        cliente = clientes.find((c) => c.id === id);
//        if (cliente) {
//            idValido = true;
//        } else {
//            alert(`No se encontró cliente con id ${id}. Intenta de nuevo`);
//        }
//    }
//    console.log('Cliente encontrado:');
//    console.table(cliente);
//}

// Simula intentos con un arreglo de IDs a consultar
console.log('-----------------------------------------------------------------------');
console.log('#10 - 1 CICLO WHILE PARA CONSULTAR DATOS DE CLIENTE HASTA OBTENER ID VÁLIDO');
console.log('-----------------------------------------------------------------------');
function consultarClienteHastaValido(idInicial) {
  const intentos = [, 99, 12, idInicial, 33, 1]; // lista simulada de intentos
  let cliente = null;
  let i = 0;

  while (!cliente && i < intentos.length) {
    const id = intentos[i];
    console.log(`Intento con ID: ${id}`);

    const encontrado = clientes.find(c => c.id === id && c.activo);
    if (encontrado) {
        cliente = encontrado;
        break; 
    }
    i++;
  }

  if (cliente) {
    console.log("Cliente encontrado:");
    console.log(`ID: ${cliente.id}`);
    console.log(`Nombre: ${cliente.nombre} ${cliente.apellido}`);
    console.log(`Email: ${cliente.email}`);
    console.log(`Teléfono: ${cliente.telefono}`);
  } else {
    console.log("No se encontró un cliente válido.");
  }
}

consultarClienteHastaValido(3); 

// ---------------------------------------------------------------------
// #10 FOR PARA REALIZAR CONSULTA MASIVA DE TODOS LOS CLIENTES ACTIVOS
// ---------------------------------------------------------------------
console.log('----------------------------------------------------------');
console.log('10 - 2 Consulta masiva de clientes activos utilizando for:');
console.log('----------------------------------------------------------');
for (let i = 0; i < clientes.length; i++) {
    console.log('clientes activos:');
    if (clientes[i].activo) {
        console.log(`
        ID: ${clientes[i].id} 
        Nombre: ${clientes[i].nombre}
        Apellido: ${clientes[i].apellido}
        Email: ${clientes[i].email}
        Teléfono: ${clientes[i].telefono}
    `);
    }
}


// --------------------------------------------------------------
// #11 COMBINACION DE CICLO CON IF/ELSE
// --------------------------------------------------------------
console.log('----------------------------------------------------');
console.log('#11 COMBINACION DE CICLO CON IF/ELSE');
console.log('----------------------------------------------------');
clientes.forEach((cliente) => {
    if (cliente.activo) {
        console.log(`${cliente.nombre} está activo`);
    } else {
        console.log(`${cliente.nombre} está inactivo`);
    }
});

