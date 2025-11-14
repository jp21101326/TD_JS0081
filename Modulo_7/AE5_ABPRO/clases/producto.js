// Declaración de clase
class Producto {
  constructor(nombre, descripcion, precio, cantidad) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad = cantidad;
  }

  // Getters
  get getNombre() { return this.nombre; }
  get getDescripcion() { return this.descripcion; }
  get getPrecio() { return this.precio; }
  get getCantidad() { return this.cantidad; }

  // Setters
  set setNombre(nuevoNombre) { this.nombre = nuevoNombre; }
  set setDescripcion(nuevaDescripcion) { this.descripcion = nuevaDescripcion; }
  set setPrecio(nuevoPrecio) {
    if (nuevoPrecio < 0) return console.error('El precio no puede ser negativo.');
    this.precio = nuevoPrecio;
  }
  set setCantidad(nuevaCantidad) {
    if (nuevaCantidad < 0) return console.error('La cantidad no puede ser negativa.');
    this.cantidad = nuevaCantidad;
  }

  // Método personalizado
  mostrarInfo() {
    console.table(this);
  }
}

// Expresión de clase
const ProductoExpresion = class {
  constructor(nombre, descripcion, precio, cantidad) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad = cantidad;
  }

  mostrarInfo() {
    console.log(`Producto: ${this.nombre} (${this.descripcion}) - $${this.precio}, stock: ${this.cantidad}`);
  }
};

// Instancias de prueba
const producto1 = new Producto('Laptop', 'Notebook 15"', 700000, 10);
const producto2 = new Producto('Mouse', 'Inalámbrico Logitech', 25000, 50);
const producto3 = new Producto('Teclado', 'Mecánico RGB', 55000, 20);

producto1.mostrarInfo();
producto2.mostrarInfo();
producto3.mostrarInfo();

module.exports = { Producto, ProductoExpresion };
