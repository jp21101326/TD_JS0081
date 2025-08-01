// M4_AE1_ABP-Ejercicio individual [Actividad Evaluada]
//----------------------------------------------------------
// 1. Crear la clase Vehiculo
//----------------------------------------------------------
class Vehiculo {
    constructor(marca, modelo, año, color, kilometraje) {
        this.marca = marca,
        this.modelo = modelo,
        this.año = año,
        this.color = color,
        this.kilometraje = kilometraje
    }

    mostrarDetalles() {
        console.log("Marca:", this.marca);
        console.log("Modelo:", this.modelo);
        console.log("Año:", this.año);
        console.log("Color:", this.color);
        console.log("Kilometraje:", this.kilometraje);
    }
}

//----------------------------------------------------------
// 2. Crear clases hijas Auto, Motocicleta y Camión
//----------------------------------------------------------
class Auto extends Vehiculo {
    constructor(marca, modelo, año, color, kilometraje, numeroDePuertas) {
        super(marca, modelo, año, color, kilometraje);
        this.numeroDePuertas = numeroDePuertas;
    }

    mostrarDetalles() {
        console.log("Marca:", this.marca);
        console.log("Modelo:", this.modelo);
        console.log("Año:", this.año);
        console.log("Color:", this.color);
        console.log("Kilometraje:", this.kilometraje);
        console.log("Número de puertas:", this.numeroDePuertas);
    }
}

class Motocicleta extends Vehiculo {
    constructor(marca, modelo, año, color, kilometraje, tipoDeManillar) {
        super(marca, modelo, año, color, kilometraje);
        this.tipoDeManillar = tipoDeManillar;
    }

    mostrarDetalles() {
        console.log("Marca:", this.marca);
        console.log("Modelo:", this.modelo);
        console.log("Año:", this.año);
        console.log("Color:", this.color);
        console.log("Kilometraje:", this.kilometraje);
        console.log("Tipo de manillar:", this.tipoDeManillar);
    }
}

class Camion extends Vehiculo {
    constructor(marca, modelo, año, color, kilometraje, capacidadDeCarga) {
        super(marca, modelo, año, color, kilometraje);
        this.capacidadDeCarga = capacidadDeCarga;
    }
    // super.mostrarDetalles
    mostrarDetalles() {
        //console.log("Marca:", this.marca);
        //console.log("Modelo:", this.modelo);
        //console.log("Año:", this.año);
        //console.log("Color:", this.color);
        //console.log("Kilometraje:", this.kilometraje);
        super.mostrarDetalles();
        console.log("Capacidad de carga:", this.capacidadDeCarga);
    }
}

//----------------------------------------------------------
// 3. Crear objetos literales
//----------------------------------------------------------
let vehiculo = {
    "marca": "Mazda",
    "modelo": "Mazda 3",
    "año": 2025,
    "color": "Negro",
    "kilometraje": 0,

    mostrarDetalles: function() {
        console.log("Marca:", this.marca);
        console.log("Modelo:", this.modelo);
        console.log("Año:", this.año);
        console.log("Color:", this.color);
        console.log("Kilometraje:", this.kilometraje);
    }
}

//----------------------------------------------------------
// 4. Crear una instancia de cada clase
//----------------------------------------------------------
let auto = new Auto("Suzuki", "Swift", 2025, "Blanco", 0, 4);
let motocicleta  = new Motocicleta("Yamaha", "MT-07", 2025, "Negro", 0, "Recto");
let camion  = new Camion("Scania", "R500", 2025, "Blanco", 0, 26000);


//----------------------------------------------------------
// 5. Generar un archivo JSON
//----------------------------------------------------------
let ArchivoJSON = `{
    "vehiculos": [
        {
            "marca": "Suzuki",
            "modelo": "Swift",
            "año": 2025,
            "color": "Negro",
            "tipo": "auto",
            "kilometraje": 0
        },
        {
            "marca": "Yamaha",
            "modelo": "MT-07",
            "año": 2025,
            "color": "Negro",
            "tipo": "motocicleta",
            "kilometraje": 0
        },
        {
            "marca": "Scania",
            "modelo": "R500",
            "año": 2025,
            "color": "Blanco",
            "tipo": "camion",
            "kilometraje": 0
        }
    ]
}`;

//----------------------------------------------------------
// 6. Manipulación de JSON
//----------------------------------------------------------
// Convertir a objeto JavaScript usando JSON.parse()
const objetoVehiculos = JSON.parse(ArchivoJSON);
// Convertir el objeto de vuelta a cadena JSON con JSON.stringify()
const CadenaJSON = JSON.stringify(objetoVehiculos);



//----------------------------------------------------------
// Mostrar detalles de las instancias
//----------------------------------------------------------
console.log("Detalles de las instancias:");
console.log("\nAuto:");
auto.mostrarDetalles();

console.log("\nMotocicleta:");
motocicleta.mostrarDetalles();

console.log("\nCamión:");
camion.mostrarDetalles();

console.log("\nObjeto Javacript --> usando JSON.parse()");
console.log(objetoVehiculos);

console.log("\nObjeto de vuelta a una cadena JSON con JSON.stringify()");
console.log(CadenaJSON);