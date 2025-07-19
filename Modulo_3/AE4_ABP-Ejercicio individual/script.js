console.log("-----------------------------------------------------");
console.log("1.	¿Qué es una función y para qué sirve? ");
console.log("Las funciones son bloques de código que se ejecutan solo cuando las llamamos, lo que nos permite reutilizar el código sin tener que escribirlo una y otra vez. Las funciones son herramientas poderosas que nos permiten estructurar de manera más organizada nuestro código.");
console.log("-----------------------------------------------------");

//-----------------------------------------------------
//2.- Definir funciones
//----------------------------------------------------
    function calcularGastosTotales(renta, comida, transporte) {
        let gastosTotales = renta + comida + transporte;
        return gastosTotales;
    }

//-----------------------------------------------------
//3.- Paso de parámetros en una función
//-----------------------------------------------------
    function calcularAhorroMensual(ingresosMensuales, gastosTotales) {
        let ahorroMensual = ingresosMensuales - gastosTotales;
        return ahorroMensual;
    }


//-----------------------------------------------------
//4.- Retorno de una función
//-----------------------------------------------------
console.log("-----------------------------------------------------");
    let gastos = calcularGastosTotales(5000, 2000, 1500); 
    let ahorro = calcularAhorroMensual(10000, gastos);
    console.log("Ahorro mensual:", ahorro); 
console.log("-----------------------------------------------------");
//-----------------------------------------------------
//5.- Variables locales y variables globales
//-----------------------------------------------------
    let moneda = "MXN"; 
    function mostrarResumenFinanciero() {
        let ingresos = 10000;
        let gastos = calcularGastosTotales(5000, 2000, 1500);
        let ahorro = calcularAhorroMensual(ingresos, gastos);

        console.log("Resumen financiero:");
        console.log("Ingresos:", ingresos, moneda);
        console.log("Gastos:", gastos, moneda);
        console.log("Ahorro:", ahorro, moneda);
    }

    mostrarResumenFinanciero();
 console.log("-----------------------------------------------------");   
//-----------------------------------------------------
//6.- Invocación de una función
//-----------------------------------------------------
    let resultado = calcularGastosTotales(5000, 2000, 1500);
    calcularAhorroMensual(10000, resultado);

//-----------------------------------------------------
//7.- Alcance de las variables locales
//-----------------------------------------------------
    function verificarSaldo() {
         let saldoSeguro = 2000;
         console.log("Saldo dentro de la función:", saldoSeguro);
    }

    verificarSaldo();
     
    //descomentar console.log(saldoSeguro); para ver el error
    //console.log(saldoSeguro); 
    // Error: ReferenceError: saldoSeguro is not defined
    // Este error ocurre porque saldoSeguro es una variable local, creada dentro de una función. 
    // Las variables locales solo existen dentro de la función donde se declaran, por eso no se pueden
    // usar fuera de ella.

console.log("-----------------------------------------------------");

//-----------------------------------------------------
//8.- El problema de las variables globales
//-----------------------------------------------------
    let descuento = 100; 
    function calcularDescuento() {
         let descuento = 50; 
         console.log("Descuento dentro de la función:", descuento); 
    }

    console.log("Descuento global antes:", descuento); 
    calcularDescuento();
    console.log("Descuento global después:", descuento); 

    //Analiza qué ocurrió con la variable global y por qué es importante evitar este tipo de situaciones:
    //  Si bien la variable global descuento se llama igual, a que está dentro de la función es otra diferente,
    //  porque fue creada dentro de la función, siendo una variable local, y solo  ahí opera, no cambia ni afecta
    //  a la que está fuera (global), pese a que tienen el mismo nombre.

    console.log("-----------------------------------------------------");


//-----------------------------------------------------
//9.- Crear una función anidada
//-----------------------------------------------------
    function gestionarFinanzas() {
        let renta = 5000;
        let comida = 2000;
        let transporte = 1500;
        let ingresos = 10000;

        let gastos = calcularGastosTotales(renta, comida, transporte);
        let ahorro = calcularAhorroMensual(ingresos, gastos);

        function imprimirResumen() {
             console.log(`Tus gastos fueron de ${gastos} ${moneda} y tu ahorro fue de ${ahorro} ${moneda}.`);
        }
        imprimirResumen();
    }

 console.log("-----------------------------------------------------");   
gestionarFinanzas();	
