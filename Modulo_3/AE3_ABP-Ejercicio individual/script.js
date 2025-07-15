// Importamos el módulo readline para entrada de datos por consola (Node.js)
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// 1.- Arreglo vacío para empleados
let empleados = [];

// 2.- Agregamos 5 empleados al arreglo
function IniciarEmpleados() {
    console.log("2.- Agregar al menos 5 objetos de empleados al arreglo");
    empleados.push(
    { nombre: "Lucia",   edad: 28, puesto: "Diseñadora",    salario: 4200 },
    { nombre: "Erika",   edad: 45, puesto: "Contador",      salario: 5000 },
    { nombre: "Marta",   edad: 52, puesto: "Gerente",       salario: 6200 },
    { nombre: "Roberto", edad: 38, puesto: "Desarrollador", salario: 4800 },
    { nombre: "Vitor",   edad: 51, puesto: "Marketing",     salario: 4500 }
    );
    console.log("------------------------------------------------------------------------------");
}

// 3.- Mostrar un empleado por índice
function mostrarEmpleadoPorIndice(indice) {
    console.log("3.- Acceder a un elemento específico");
    if (empleados[indice]) {
        console.log("ID Empleado", indice, ":", empleados[indice]);
        console.log("Nombre:", empleados[indice].nombre);
        console.log("Edad:", empleados[indice].edad);
        console.log("Puesto:", empleados[indice].puesto);
        console.log("Salario:", empleados[indice].salario);
    } else {
        console.log("ID Empleado fuera de rango.");
    }
    console.log("------------------------------------------------------------------------------");
}

// 4.- Contar empleados
function contarEmpleados() {
    console.log("4.- Contar el número de empleados en el arreglo usando la propiedad length y mostrarlo en consola.");
    console.log("Total de empleados:", empleados.length);
    console.log("------------------------------------------------------------------------------");
}

// 5.- Mostrar nombre del empleado
function mostrarNombreEmpleado() {
     console.log("5.- Iterar sobre el arreglo de empleados utilizando un ciclo for para mostrar en consola el nombre de cada empleado.");
     for (let i = 0; i < empleados.length; i++) {
        console.log("-", empleados[i].nombre);
     }
     console.log("------------------------------------------------------------------------------");
}

// 6.- Agregar un empleado al arreglo
function agregarEmpleado(nombre, edad, puesto, salario) {
     console.log("6.- Añadir un nuevo empleado al final del arreglo utilizando el método push().");
     empleados.push({ nombre, edad, puesto, salario });
     console.log("Empleado agregado exitosamente!!");
     console.log("------------------------------------------------------------------------------");
}

// 7.- Eliminar empleado por índice
function eliminarEmpleado(indice) {
    console.log("7.- Eliminar un empleado del arreglo utilizando el método splice() y mostrar el arreglo actualizado en consola.");
    if (indice >= 0 && indice < empleados.length) {
        empleados.splice(indice, 1);
        console.log("Empleado eliminado exitosamente!!", indice);
    } else {
        console.log("Índice Empleado no válido.");
    }
    console.log("------------------------------------------------------------------------------");
}

// Mostrar todos los empleados
function listarEmpleados() {
     console.log("Listado Actualizado de empleados:");
     empleados.forEach(emp => console.log("-", emp.nombre));
     console.log("------------------------------------------------------------------------------");
}

// 8.- Realizar operaciones algebraicas:
// 8.1 Calcular salario total
function calcularSalarioTotal() {
    let total = 0;
    empleados.forEach(emp => total += emp.salario);
    return total;
}

// 8.2 Buscar empleado con salario más alto
function empleadoConSalarioMaximo() {
    let top = empleados[0];
    for (let i = 1; i < empleados.length; i++) {
        if (empleados[i].salario > top.salario) {
        top = empleados[i];
        }
    }
    return top;
}

// 8.3 Concatenar nombres de empleados
function concatenarNombres() {
    //return empleados.map(e => e.nombre).join(", ");
    console.log("8.- Concatenar los nombres de todos los empleados en un solo string.");
    let nombresConcatenados = "";
    for (let i = 0; i < empleados.length; i++) {
    nombresConcatenados += empleados[i].nombre;
    if (i !== empleados.length - 1) nombresConcatenados += ", ";
    }
    console.log("\n📝 Nombres concatenados:", nombresConcatenados);
    console.log("------------------------------------------------------------------------------");
}

// 9.- empleado con el salario más alto
function verificarSalariosAltos(limite) {
     console.log("Empleados con un salario superior a", limite);
    let i = 0;
    while (i < empleados.length) {
        if (empleados[i].salario > limite) {
        console.log("Empleado ", empleados[i].nombre, " tiene salario alto: ", empleados[i].salario);
        return;
        }
        i++;
    }
    console.log("Ningún salario supera", limite);
    console.log("------------------------------------------------------------------------------");
}


// 10.- Agregar empleados con do/while
// revisar como generar esta function


//11.-  Aplicar condiciones:
//11.1  Verificar empleados mayores de 50 (senior)
function verificarEmpleadosSenior() {
    console.log("Empleados mayores de 50 años, es un empleado senior:");
    for (let i = 0; i < empleados.length; i++) {
        if (empleados[i].edad > 50) {
             console.log(empleados[i].nombre, ", es un empleado senior.");
        } else {
            console.log(empleados[i].nombre, ", no es senior.");
        }
    }
    console.log("------------------------------------------------------------------------------");
}

// 12.- Realizar una operación de diferencia
// Comparar salarios entre departamentos
function compararSalariosDepartamentos(depto1, depto2) {
  let diferencia = [];
  let minLength = Math.min(depto1.length, depto2.length);
  for (let i = 0; i < minLength; i++) {
    diferencia.push(Math.abs(depto1[i] - depto2[i]));
  }
  console.log("\n📊 Diferencia entre salarios de departamentos:", diferencia);
}
//////////////////////////////////////////////////////////////////////////////////////
function compararSalariosPorTodosLosPuestos() {
  // 1. Agrupar salarios por puesto
  const puestosMap = {};

  empleados.forEach(emp => {
    const puesto = emp.puesto;
    if (!puestosMap[puesto]) {
      puestosMap[puesto] = [];
    }
    puestosMap[puesto].push(emp.salario);
  });

  // 2. Obtener todos los nombres de puestos
  const puestos = Object.keys(puestosMap);

  // 3. Comparar cada par único de puestos
  console.log("Comparación de salarios entre puestos:");

  for (let i = 0; i < puestos.length; i++) {
    for (let j = i + 1; j < puestos.length; j++) {
      const p1 = puestos[i];
      const p2 = puestos[j];

      const salarios1 = puestosMap[p1];
      const salarios2 = puestosMap[p2];
      const minLen = Math.min(salarios1.length, salarios2.length);

      const diferencias = [];

      for (let k = 0; k < minLen; k++) {
        diferencias.push(Math.abs(salarios1[k] - salarios2[k]));
      }

      console.log(`Diferencia entre "${p1}" y "${p2}":`, diferencias);
    }
  }
}


////////////////////////////////////////

// 2.- Iniciar empleados
IniciarEmpleados();
// 3.- Mostrar empleado 
mostrarEmpleadoPorIndice(3);
// Listar empleados
//listarEmpleados();
// Contar número de empleados
console.log("Total de empleados:", empleados.length);
// Mostrar nombres de empleados
mostrarNombreEmpleado();
// Agregar empleados
agregarEmpleado("Juan Pérez", 30, "Desarrollador", 50000);
// Eliminar empleado
eliminarEmpleado(1);
listarEmpleados();

// Calcular salario total
console.log("Salario total:", calcularSalarioTotal());
console.log("-------------------------------------");

// Buscar empleado con salario más alto
console.log("Empleado con salario más alto:", empleadoConSalarioMaximo());
console.log("-------------------------------------");

// Nombres concatenados de empleados
//console.log("Nombres concatenados de empleados:", concatenarNombres());
concatenarNombres();

// Verificar salarios altos
verificarSalariosAltos(5000);

// Verificar empleados mayores de 50
verificarEmpleadosSenior();

// interacción para agregar empleados
// 10.- Usar la instrucción do/while para pedir al usuario que ingrese los datos de un nuevo empleado.
//      El ciclo debe continuar hasta que el usuario decida no agregar más empleados


//Realizar una operación de diferencia 
compararSalariosPorTodosLosPuestos();