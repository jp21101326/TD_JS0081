import {accion} from "./accion.js"

const resumenPedido = (mapPedidos) => {
    console.log("\nResumen de Pedidos\n=======================");

    mapPedidos.forEach((estado, ingrediente) => {
        console.log(`${ingrediente} : ${estado ? "Listo" : "Pendiente"}`);
    });
}

const realizarPedido = () => {    
    const prepararCafe = accion;
    const tostarPan = accion;
    const exprimirJugo = accion;
    const mapPedidos = new Map([
        ['Cafe', false],
        ['Pan Tostado', false],
        ['Jugo', false]
    ]);

    prepararCafe(1, 3)
    .then(duracion => {
        console.log(`Café listo en ${(duracion/1000).toFixed(2)} segundos.`);
        mapPedidos.set('Cafe',true);
    })
    .catch(error => {
        console.log(error + " No hay café disponible");
    })
    .finally(() => {
        tostarPan(2, 4)
        .then(duracion => {
            console.log(`Pan Tostado listo en ${(duracion/1000).toFixed(2)} segundos.`);
            mapPedidos.set('Pan Tostado',true);
        })
        .catch(error => {
            console.log(error + " No hay pan disponible");
        })
        .finally(() => {
            exprimirJugo(1, 2)
            .then(duracion => {
                console.log(`Jugo listo en ${(duracion/1000).toFixed(2)} segundos.`);
                mapPedidos.set('Jugo',true);
            })
            .catch(error => {
                console.log(error + " No hay fruta disponible");
            })
            .finally(() => {
                resumenPedido(mapPedidos);
            })
        })
    });
}

realizarPedido();