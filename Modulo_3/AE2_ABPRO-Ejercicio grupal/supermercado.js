
////////////////////////////////////////////////////////
// sistema básico en JavaScript que registre las compras de los clientes en una terminal de autoservicio 
////////////////////////////////////////////////////////
// Constantes del sistema
    const LIMITE_DESCUENTO = 5600;
    const PORCENTAJE_DESCUENTO = 0.1;
    const IMPUESTO = 0.19;

    // Lista de clientes con sus carritos
    let clientes = [
            {
                Nombre_cliente: "Camila Torres",
                carrito: [
                { nombre: "Café",     cantidad: 2, precio: 5470 },
                { nombre: "Azúcar",   cantidad: 1, precio: 1470 },
                { nombre: "Galletas", cantidad: 3, precio: 1500 },
                ]
            },
            {
                Nombre_cliente: "Andrés Rojas",
                carrito: [
                { nombre: "Azúcar", cantidad: 1, precio: -2000 }, 
                { nombre: "Harina", cantidad: 2, precio: 1300 }
                ]
            },
            {
                Nombre_cliente: "Fernanda Díaz",
                carrito: [] 
            },
            {
                Nombre_cliente: "Gloria Fuentes",
                carrito: [
                    { nombre: "Azúcar", cantidad: 1, precio: 2500 }
                ] 
            }
    ];

    // Recorrer cada cliente
    let i = 0;
    while (i < clientes.length) {
         let cliente = clientes[i];
         let total_compra = 0;
         let descuento = 0;
         let valido = true;

         console.log("Cliente: " + cliente.Nombre_cliente);

         // Validar carrito vacío
         if (cliente.carrito.length === 0) {
            console.log("Tu carrito está vacío.");
            valido = false;
         }

         if (cliente.Nombre_cliente === "Gloria Fuentes") {
             console.log("Quiero agregar un chocolate..");
             cliente.carrito.push({ nombre: "Chocolate", cantidad: 1, precio: 3200 });
             //let gloria = clientes.find(cliente => cliente.Nombre_cliente === "Gloria Fuentes");
             //if (gloria) {
             //gloria.carrito.push({ nombre: "Chocolate", cantidad: 1, precio: 3200 });
             //}
        }

        // Recorrer productos del carrito
         let j = 0;
         while (j < cliente.carrito.length) {
             let producto = cliente.carrito[j];
             if (producto.cantidad <= 0 || producto.precio < 0) {
                 console.log("Producto inválido: " + producto.nombre);
                 valido = false;
             } else {
                 let precio_item =  (producto.cantidad * producto.precio);
                 total_compra = total_compra + (producto.cantidad * producto.precio);
                 //console.log(producto.nombre + " CANT." + producto.cantidad + " P.U.$" + producto.precio + " TOT.$ " + precio_item);
                 console.log(producto.nombre.padEnd(15) + String(producto.cantidad).padEnd(8) + String(producto.precio).padEnd(10) + String(precio_item));
             }

             j = j + 1;
        }

        // Aplicar descuento si corresponde
         if (total_compra > LIMITE_DESCUENTO) {
             descuento = total_compra * PORCENTAJE_DESCUENTO;
             total_compra = total_compra - descuento;
         }

         // Mostrar resultado de la compra
         if (valido && total_compra > 0) {
             if (descuento > 0) {
                 console.log("Descuento aplicado de $" + descuento + ".-");
             }
             console.log("Total a pagar: $" + total_compra + ".-");
             console.log("Gracias por tu compra.");
         } else {
             console.log("No se pudo completar la compra.");
         }

         console.log("------------------------------------------------"); // Separador entre clientes
         i = i + 1;
    }
