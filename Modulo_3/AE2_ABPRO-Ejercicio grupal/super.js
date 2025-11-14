/* --- variables ---- */

// datos cliente
let nombreCliente = 'Pepe';

// lista de productos
let listaProductos = [];

// total de compra y descuento aplicado
let totalCompra = 0;
let descuentoAplicado = 0;

/* --- Constantes  --- */
const MONTO_MINIMO_DESCUENTO = 10000;
const MAX_PRODUCTOS_PERMITIDOS = 50;
const PORCENTAJE_DESCUENTO = 0.1;

// añadir producto al carrito
function agregarProducto(nombreProducto, cantidad, precioUnitario) {
    if (
        // validador para producto, cantidad y precio
        typeof nombreProducto !== 'string' ||
        typeof cantidad !== 'number' ||
        typeof precioUnitario !== 'number' ||
        cantidad <= 0 ||
        precioUnitario <= 0
    ) {
        console.log('Producto inválido. Revisar.');
        return;
    }

    // validador para límite de productos
    if (listaProductos.length >= MAX_PRODUCTOS_PERMITIDOS) {
        console.log('No se pueden agregar más productos');
        return;
    }

    listaProductos.push({
        nombre: nombreProducto,
        cantidad,
        precio: precioUnitario,
    });

    totalCompra += cantidad * precioUnitario;
    console.log(`${cantidad} x ${nombreProducto} añadidos por $${cantidad * precioUnitario}`);
	
}

// quitar producto por indice
function quitarProducto(index) {
    if (index < 0 || index >= listaProductos.length) {
        console.log('Índice inválido');
        return;
    }

    const producto = listaProductos.splice(index, 1)[0];
    totalCompra -= producto.precio * producto.cantidad;
    console.log(`${producto.nombre} eliminado del carrito`);
}

// finalizar compra
function finalizarCompra() {
    // validador carrito no vacío && total != 0
    if (listaProductos.length === 0 || totalCompra === 0) {
        console.log(`Tu carrito está vacío.`);
        return;
    }

    // aplicación de descuento
    if (totalCompra >= MONTO_MINIMO_DESCUENTO) {
        descuentoAplicado = totalCompra * PORCENTAJE_DESCUENTO;
        totalCompra -= descuentoAplicado;
        console.log(`Aplicaste un descuento de $${descuentoAplicado}`);
    } else {
        console.log('No se aplicó descuento');
    }

    console.log(`Total a pagar: $${totalCompra}. Gracias por tu compra.`);
}


agregarProducto('LECHE', 1, 1560)
agregarProducto('PAN', 1, 300)
agregarProducto('ARROZ', 1, 4500)
quitarProducto(1);
finalizarCompra();