console.log("---------------------------------------------------------------------");
console.log("1.- Arreglo vacío para empleados");
console.log("---------------------------------------------------------------------");
let empleados = [];

console.log("---------------------------------------------------------------------");
console.log("2.- Agregamos 5 empleados al arreglo");
console.log("---------------------------------------------------------------------");
function IniciarEmpleados() {
    empleados.push(
    { nombre: "Lucia",   edad: 28, puesto: "Diseñadora",    salario: 4200 },
    { nombre: "Erika",   edad: 45, puesto: "Contador",      salario: 5000 },
    { nombre: "Marta",   edad: 52, puesto: "Gerente",       salario: 6200 },
    { nombre: "Roberto", edad: 38, puesto: "Desarrollador", salario: 4800 },
    { nombre: "Vitor",   edad: 51, puesto: "Marketing",     salario: 4500 }
    );
}

console.log("---------------------------------------------------------------------");
console.log("3.- Mostrar un empleado por índice");
console.log("---------------------------------------------------------------------");
function mostrarEmpleadoPorIndice(indice) {
    if (empleados[indice]) {
        console.log("ID Empleado", indice, ":", empleados[indice]);
        console.log("Nombre:", empleados[indice].nombre);
        console.log("Edad:", empleados[indice].edad);
        console.log("Puesto:", empleados[indice].puesto);
        console.log("Salario:", empleados[indice].salario);
    } else {
        console.log("ID Empleado fuera de rango.");
    }
    
}

console.log("---------------------------------------------------------------------");
console.log("4.- Contar empleados");
console.log("---------------------------------------------------------------------");
function contarEmpleados() {
    console.log("Total de empleados:", empleados.length);
}

console.log("---------------------------------------------------------------------");
console.log("5.- Mostrar nombre del empleado");
console.log("---------------------------------------------------------------------");
function mostrarNombreEmpleado() {
     for (let i = 0; i < empleados.length; i++) {
        console.log("-", empleados[i].nombre);
     }
}

console.log("---------------------------------------------------------------------");
console.log("6.- Agregar un empleado al arreglo");
console.log("---------------------------------------------------------------------");
function agregarEmpleado(nombre, edad, puesto, salario) {
     empleados.push({ nombre, edad, puesto, salario });
     console.log("Empleado agregado exitosamente!!");
}

console.log("---------------------------------------------------------------------");
console.log("7.- Eliminar empleado por índice");
console.log("---------------------------------------------------------------------");
function eliminarEmpleado(indice) {
    if (indice >= 0 && indice < empleados.length) {
        empleados.splice(indice, 1);
        console.log("Empleado eliminado exitosamente!!", indice);
    } else {
        console.log("Índice Empleado no válido.");
    }
 
}

console.log("---------------------------------------------------------------------");
console.log("Mostrar todos los empleados");
console.log("---------------------------------------------------------------------");
function listarEmpleados() {
     console.log("Listado Actualizado de empleados:");
     empleados.forEach(emp => console.log("-", emp.nombre));
}

console.log("---------------------------------------------------------------------");
console.log("8.- Realizar operaciones algebraicas:");
console.log("8.1 Calcular salario total");
console.log("---------------------------------------------------------------------");
function calcularSalarioTotal() {
    let total = 0;
    empleados.forEach(emp => total += emp.salario);
    return total;
}

console.log("---------------------------------------------------------------------");
console.log("8.2 Buscar empleado con salario más alto");
console.log("---------------------------------------------------------------------");
function empleadoConSalarioMaximo() {
    let top = empleados[0];
    for (let i = 1; i < empleados.length; i++) {
        if (empleados[i].salario > top.salario) {
        top = empleados[i];
        }
    }
    return top;
}

console.log("---------------------------------------------------------------------");
console.log("8.3 Concatenar nombres de empleados");
console.log("---------------------------------------------------------------------");
function concatenarNombres() {
    //return empleados.map(e => e.nombre).join(", ");

    let nombresConcatenados = "";
    for (let i = 0; i < empleados.length; i++) {
    nombresConcatenados += empleados[i].nombre;
    if (i !== empleados.length - 1) nombresConcatenados += ", ";
    }
    console.log("\n📝 Nombres concatenados:", nombresConcatenados);
  
}

console.log("---------------------------------------------------------------------");
console.log("9.- empleado con el salario más alto");
console.log("---------------------------------------------------------------------");
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
   
}


// 10.- Agregar empleados con do/while
console.log("-----------------------------------------------------------------------");
console.log("10.- Simular ingreso de empleados con do/while (sin readline ni prompt)");
console.log("-----------------------------------------------------------------------");

const nuevosEmpleados = [
  { nombre: "Ana", edad: 32, puesto: "Ventas", salario: 3900 },
  { nombre: "Carlos", edad: 29, puesto: "Diseñador", salario: 4100 },
  { nombre: "Sofia", edad: 41, puesto: "Analista", salario: 4700 }
];

let index = 0;
let deseaAgregar = true;
do {
    const nuevo = nuevosEmpleados[index];
    if (nuevo) {
        empleados.push(nuevo);
        console.log("Empleado agregado:", nuevo.nombre);
        index++;
    } else {
        deseaAgregar = false; 
    }
} while (deseaAgregar);

console.log("Empleados después del do/while simulado:");
listarEmpleados();


console.log("---------------------------------------------------------------------");
console.log("11.-  Aplicar condiciones:");
console.log("11.1  Verificar empleados mayores de 50 (senior)");
console.log("---------------------------------------------------------------------");
function verificarEmpleadosSenior() {
    console.log("Empleados mayores de 50 años, es un empleado senior:");
    for (let i = 0; i < empleados.length; i++) {
        if (empleados[i].edad > 50) {
             console.log(empleados[i].nombre, ", es un empleado senior.");
        } else {
            console.log(empleados[i].nombre, ", no es senior.");
        }
    }
    
}

console.log("---------------------------------------------------------------------");
console.log("12.- Realizar una operación de diferencia");
console.log("Comparar salarios entre departamentos");
console.log("---------------------------------------------------------------------");
function compararSalariosDepartamentos(depto1, depto2) {
  let diferencia = [];
  let minLength = Math.min(depto1.length, depto2.length);
  for (let i = 0; i < minLength; i++) {
    diferencia.push(Math.abs(depto1[i] - depto2[i]));
  }
  console.log("Diferencia entre salarios de departamentos:", diferencia);
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


//Realizar una operación de diferencia 
compararSalariosPorTodosLosPuestos();