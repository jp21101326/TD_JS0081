import {accion} from "./accion.js"

const resumenPedido = (resultados, ingredientes) => {
    console.log("\nResumen de Pedidos\n=======================");

    resultados.forEach((resultado, index) => {
        console.log(`${ingredientes[index]} : ${resultado.status == "fulfilled" ? "Listo" : "Pendiente"}`);
    });
}

const realizarPedidoOp = async() =>{
    const prepararCafe = accion;
    const tostarPan = accion;
    const exprimirJugo = accion;
    const promesas = [prepararCafe(1,3), tostarPan(2,4), exprimirJugo(1,2)];
    const ingredientes = ['Cafe', 'Pan', 'Jugo'];

    console.log("\nPreparando Pedido.....\n=======================");

    const resultados = await Promise.allSettled(promesas)
 
    resultados.forEach((resultado, index) => {
        if(resultado.status == "fulfilled"){
            console.log(`${ingredientes[index]} listo en ${(resultado.value/1000).toFixed(2)} segundos.`);
        } else {
            const ingrediente = ingredientes[index].toLowerCase();
            console.log(resultado.reason + ` No hay ${(ingrediente == 'jugo')? 'fruta' : ingrediente} disponible`);
        }
    });

    resumenPedido(resultados, ingredientes);
}

realizarPedidoOp();