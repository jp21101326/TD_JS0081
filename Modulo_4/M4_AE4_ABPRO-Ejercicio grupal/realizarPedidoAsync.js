import {accion} from "./accion.js"

const resumenPedido = (mapPedidos) => {
    console.log("\nResumen de Pedidos\n=======================");

    mapPedidos.forEach((estado, ingrediente) => {
        console.log(`${ingrediente} : ${estado ? "Listo" : "Pendiente"}`);
    });
}

const realizarPedidoAsync = async() =>{
    const prepararCafe = accion;
    const tostarPan = accion;
    const exprimirJugo = accion;
    let duracion;

    const mapPedidos = new Map([
        ['Cafe', false],
        ['Pan Tostado', false],
        ['Jugo', false]
    ]);

    console.log("\nPreparando Pedido.....\n=======================");

    try{
        duracion = await prepararCafe(1, 3);
        console.log(`Café listo en ${(duracion/1000).toFixed(2)} segundos.`);
        mapPedidos.set('Cafe',true);        
    } catch(error) {
        console.log(error + " No hay café disponible");
    }

    try{
        duracion = await tostarPan(2, 4);
        console.log(`Pan Tostado listo en ${(duracion/1000).toFixed(2)} segundos.`);
        mapPedidos.set('Pan Tostado',true);           
    } catch(error) {
        console.log(error + " No hay pan disponible");
    }

    try{
        duracion = await exprimirJugo(1, 2);
        console.log(`Jugo listo en ${(duracion/1000).toFixed(2)} segundos.`);
        mapPedidos.set('Jugo',true);           
    } catch(error) {
        console.log(error + " No hay fruta disponible");
    }

    resumenPedido(mapPedidos);
}

realizarPedidoAsync();