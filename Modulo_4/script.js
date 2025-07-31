

// 1. Crear la clase Vehiculo
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

// 2. Crear clases hijas
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

    mostrarDetalles() {
        console.log("Marca:", this.marca);
        console.log("Modelo:", this.modelo);
        console.log("Año:", this.año);
        console.log("Color:", this.color);
        console.log("Kilometraje:", this.kilometraje);
        console.log("Capacidad de carga:", this.capacidadDeCarga);
    }
}

// 3. 
let vehiculo = {
    "marca": "Mazda",
    "modelo": "Mazda 3",
    "año": 2025,
    "color": "Negro",
    "kilometraje": 0,
    
    mostrarDetalles() {
        console.log("Marca:", this.marca);
        console.log("Modelo:", this.modelo);
        console.log("Año:", this.año);
        console.log("Color:", this.color);
        console.log("Kilometraje:", this.kilometraje);
    }
}

// 4. 
let auto1 = new Auto("Suzuki", "Swift", 2025, "Blanco", 0, 4);
let moto1 = new Motocicleta("Yamaha", "MT-07", 2025, "Negro", 0, "Recto");
let camion1 = new Camion("Scania", "R500", 2025, "Blanco", 0, 26000);


// 5. 
let json = {
    "vehiculos": [
        {
            "marca": "Suzuki",
            "modelo": "Swift",
            "año": 2025,
            "color": "Negro",
            "kilometraje": 0
        },
        {
            "marca": "Yamaha",
            "modelo": "MT-07",
            "año": 2025,
            "color": "Negro",
            "kilometraje": 0
        },
        {
            "marca": "Scania",
            "modelo": "R500",
            "año": 2025,
            "color": "Blanco",
            "kilometraje": 0
        }
    ]
}

// 6. 
let jsonJSON = JSON.stringify(json);
console.log(jsonJSON);
let jsonJavascript = JSON.parse(jsonJSON);
console.log(jsonJavascript);