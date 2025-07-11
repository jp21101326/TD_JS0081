const DESCUENTO_POR_MONTO = 100;
const PORCENTAJE_DESCUENTO = 0.1;
const MAX_PRODUCTOS = 10;

let nombreCliente = "Linn";
let carrito = [];
let totalCompra = 0;
let descuentoAplicado = false;

function agregarProducto(nombre, cantidad, precio) {
  if (cantidad <= 0 || precio < 0) {
    console.log(`❌ Producto inválido: "${nombre}". Cantidad o precio incorrecto.`);
    return;
  }

  if (carrito.length >= MAX_PRODUCTOS) {
    console.log(`❌ No puedes agregar más de ${MAX_PRODUCTOS} productos.`);
    return;
  }

  carrito.push({ nombre, cantidad, precio });
  console.log(`✅ Producto añadido: ${cantidad} x ${nombre} ($${precio} c/u)`);
}

function quitarProducto(nombre) {
  const index = carrito.findIndex(p => p.nombre === nombre);
  if (index !== -1) {
    carrito.splice(index, 1);
    console.log(`🗑️ Producto eliminado: ${nombre}`);
  } else {
    console.log(`❌ Producto no encontrado: ${nombre}`);
  }
}

function calcularTotal() {
  totalCompra = 0;
  carrito.forEach(p => {
    totalCompra += p.precio * p.cantidad;
  });

  if (totalCompra >= DESCUENTO_POR_MONTO) {
    const descuento = totalCompra * PORCENTAJE_DESCUENTO;
    totalCompra -= descuento;
    descuentoAplicado = true;
  } else {
    descuentoAplicado = false;
  }
}

function finalizarCompra() {
  if (carrito.length === 0) {
    console.log("🛒 Tu carrito está vacío.");
    return;
  }

  calcularTotal();

  console.log(`🧾 Cliente: ${nombreCliente}`);
  console.log("🛍️ Productos:");
  carrito.forEach(p => {
    console.log(` - ${p.cantidad} x ${p.nombre} ($${p.precio})`);
  });

  console.log(`💵 Total: $${totalCompra.toFixed(2)}`);

  if (descuentoAplicado) {
    console.log("🎉 ¡Descuento aplicado del 10%!");
  } else {
    console.log("ℹ️ No se aplicó descuento.");
  }

  console.log("🙏 Gracias por tu compra.");
}

// 🧪 Pruebas:
agregarProducto("Pan", 2, 1.5);
agregarProducto("Leche", 1, 2.2);
agregarProducto("Huevos", 0, 3); // inválido
agregarProducto("Arroz", 1, -5); // inválido
agregarProducto("Café", 1, 98);

quitarProducto("Arroz"); // no existe
quitarProducto("Pan");

finalizarCompra();


// Diagrama de flujo simplificado:
// INICIO
//  ↓
// ¿Carrito vacío?
//  → Sí → Mostrar "Carrito vacío" → FIN
//  ↓
// Calcular total
//  ↓
// ¿Total ≥ monto para descuento?
//  → Sí → Aplicar descuento
//  ↓
// Mostrar lista de productos
//  ↓
// Mostrar total y mensaje de descuento
//  ↓
// Mostrar mensaje final
//  ↓
// FIN
