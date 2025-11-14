//-------------------------------------------------------
// Paso 1: drear un objeto llamado alien con:
//-------------------------------------------------------
const alien = {
  nombre: 'Zorg',
  planeta: 'Xenon',
  habilidades: ['telepatía', 'camuflaje', 'regeneración'],
  edad: 0,
  estadoSalud: Math.random() > 0.5,
  presentarse: function() {
    console.log(`Hola Soy ${this.nombre} de ${this.planeta}.`);
    console.log(`Edad: ${this.edad} años. Habilidades: ${this.habilidades.join(', ')}.`);
    console.log(`Salud: ${this.estadoSalud ? 'estable' : 'comprometida'}.`);
  }
};

//-------------------------------------------------------
// Paso 2: Acceder a propiedades usando notación de punto y notación de corchetes.
//-------------------------------------------------------
const nombrePorPunto = alien.nombre;
const planetaPorCorchetes = alien['planeta'];
console.log('Nombre (punto):', nombrePorPunto);
console.log('Planeta (corchetes):', planetaPorCorchetes);


// Paso 3: Usar el objeto Math para:
//-------------------------------------------------------
// Calcular una edad aleatoria entre 50 y 300 y Redondear la edad.
//-------------------------------------------------------
const minEdad = 50;
const maxEdad = 300;
const edadRandom = Math.random() * (maxEdad - minEdad) + minEdad;
alien.edad = Math.round(edadRandom);
//-------------------------------------------------------
// Generar un nivel de energía entre 0 y 100.
//-------------------------------------------------------
const nivelEnergia1 = Math.round(Math.random() * 100);
const nivelEnergia2 = Math.round(Math.random() * 100);
console.log('Nivel energía 1:', nivelEnergia1);
console.log('Nivel energía 2:', nivelEnergia2);
//-------------------------------------------------------
// Calcular cuál de dos niveles es el mayor.
//-------------------------------------------------------
const nivelMayor = Math.max(nivelEnergia1, nivelEnergia2);
console.log('Nivel de energía mayor (Math.max):', nivelMayor);

//-------------------------------------------------------
// Paso 4: Usar el objeto String para:
//-------------------------------------------------------
const nombreMayus = alien.nombre.toUpperCase();
const inicial = alien.nombre.charAt(0);
const letraABuscar = 'a';
const incluyeLetra = alien.nombre.toLowerCase().includes(letraABuscar);
console.log('Nombre en MAYÚSCULAS:', nombreMayus);
console.log('Inicial:', inicial);
console.log(`Incluye la letra "${letraABuscar}"?:`, incluyeLetra);

//-------------------------------------------------------
// Comparar un string primitivo con uno creado usando new String().
//-------------------------------------------------------
const nombrePrimitivo = alien.nombre;
const nombreObjeto = new String(alien.nombre);
const comparacionEstricta = nombrePrimitivo === nombreObjeto;
const comparacionFlexible = nombrePrimitivo == nombreObjeto;
console.log('primitivo - new String():', comparacionEstricta);
console.log('primitivo - new String():', comparacionFlexible);



//-------------------------------------------------------
// Paso 4: Usar el objeto String para:
//-------------------------------------------------------
console.log('//-------------------------------------------------------');
console.log('// FICHA INTERGALÁCTICA ');
console.log('//-------------------------------------------------------');
console.log('Nombre:', alien.nombre);
console.log('Nombre (mayúsculas):', nombreMayus);
console.log('Inicial:', inicial);
console.log('Planeta:', alien.planeta);
console.log('Habilidades:', alien.habilidades.join(', '));
console.log('Edad (redondeada):', alien.edad);
console.log('Estado de salud:', alien.estadoSalud);
console.log('Nivel energía 1:', nivelEnergia1);
console.log('Nivel energía 2:', nivelEnergia2);
console.log('Nivel mayor:', nivelMayor);
console.log('Comparación (===):', comparacionEstricta);
console.log('Comparación (==):', comparacionFlexible);

//-------------------------------------------------------
// Paso 5: Mostrar toda la información final del alien con console.log() de manera ordenada.
//-------------------------------------------------------
console.log('//-------------------------------------------------------');
console.log('// PRESENTACIÓN ');
console.log('//-------------------------------------------------------');
alien.presentarse();
