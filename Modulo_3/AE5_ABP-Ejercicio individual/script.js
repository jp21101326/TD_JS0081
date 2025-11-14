////////////////////////////////////////////////////////////////////////
// AE5_ABP-Ejercicio individual [Actividad Evaluada]
////////////////////////////////////////////////////////////////////////
// Crea un programa donde se simule el archivo secreto de un superhéroe
//----------------------------------------------------------------------

// Paso 1: Crear un objeto vacío llamado superheroe
const superheroe = {
  nombre: "",
  edad: 0,
  habilidades: [],
  activo: false,
  saludo: function () { 
    console.log("Hola, soy un super héroe");
  }
};

// Asignando valores paso a paso
superheroe["nombre"] = "Voltman";  
superheroe.habilidades = ["Volar", "Invisibilidad", "Súper fuerza"];
superheroe.activo = true;

// Personalizando el saludo
superheroe.saludo = function () {
  console.log('Hola, soy ' + superheroe.nombre + ' y tengo ' + superheroe.edad + ' años.');
};

// Paso 2: Acceder a propiedades con notación de punto y corchetes
console.log("-----------------------------------------------------");
console.log("Accediendo por punto:");
console.log("-----------------------------------------------------");
console.log("Nombre     :", superheroe.nombre);
console.log("Edad       :", superheroe.edad);
console.log("Habilidades:", superheroe.habilidades);
console.log("Activo     :", superheroe.activo);
console.log("-----------------------------------------------------");
console.log("Por corchetes:");
console.log("-----------------------------------------------------");
console.log("Nombre     :", superheroe["nombre"]);
console.log("Edad       :", superheroe["edad"]);
console.log("Activo     :", superheroe["activo"]);
console.log("Habilidades:", superheroe["habilidades"]);


// Paso 3: Usa el objeto Math para:
//3.1 Asignar una edad aleatoria entre 20 y 40 años
let edadAleatoria = Math.random() * (40 - 20) + 20; 
//3.2 Redondear la edad al entero más cercano
superheroe.edad = Math.round(edadAleatoria); 
// Paso 3.2: Obtener el valor máximo entre dos niveles de energía.
const NivelMinimo = 85;
const NivelMaxima = 93;
const EnergiaMaxima = Math.max(NivelMinimo, NivelMaxima);
console.log("Nivel Máximo de energía:", EnergiaMaxima);


//4 Usa el objeto String para:
//4.1 Manipular el nombre convertirlo a mayúsculas
const nombreMayusculas = superheroe.nombre.toUpperCase();
//4.2 Extraer la primera letra
const primeraLetra = superheroe.nombre.charAt(0);

//4.3 Comparar la versión primitiva y la versión como objeto del nombre.
const nombrePrimitivo = superheroe.nombre;
const nombreObjeto = new String(superheroe.nombre);

console.log("----------------------------------------------------------")
console.log("Paso 5: Resultado esperado en consola")
console.log("----------------------------------------------------------")
superheroe.saludo();
console.log("Mis habilidades son:", superheroe.habilidades.join(", "));
console.log("Mi edad fue asignada aleatoriamente: ", superheroe.edad);
console.log("Primera letra de mi nombre:", primeraLetra);
console.log("¿Nombre como objeto?", typeof nombreObjeto === "object");
console.log("¿Nombre primitivo?", typeof nombrePrimitivo === "string");




