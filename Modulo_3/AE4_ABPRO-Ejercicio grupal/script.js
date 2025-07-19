console.log("-----------------------------------------------------");
console.log("1.	¿Qué es una función y para qué sirve?");
console.log("Las funciones son bloques de código que se ejecutan  solo  cuando  las llamamos,");
console.log("lo que nos permite reutilizar el código sin tener que escribirlo una y otra vez.");
console.log("Las funciones son herramientas poderosas que nos permiten estructurar de manera ");
console.log("más organizada nuestro código.");
console.log("-----------------------------------------------------");

//-----------------------------------------------------
//2.- Definir funciones
//-----------------------------------------------------
    function calcularTiempoTotal(preparacion, coccion, reposo) {
        let tiempo = preparacion + coccion + reposo;
        return tiempo;
    }

//-----------------------------------------------------
//3.- Paso de parámetros en una función
//-----------------------------------------------------
    function calcularPorciones(cantidadBase, numeroDePorciones) {
        let porciones = cantidadBase * numeroDePorciones;
        return porciones;
    }

//-----------------------------------------------------
//4.- Retorno de una función
//-----------------------------------------------------
    let tiempoTotal = calcularTiempoTotal(20, 60, 10);
    let ingredientesTotales = calcularPorciones(2, 5);

    console.log("Tiempo total de cocción:", tiempoTotal, "minutos");
    console.log("Total de ingredientes:", ingredientesTotales);

//-----------------------------------------------------
//5.- Variables locales y globales
//-----------------------------------------------------
    let unidad = "minutos"; 
    function mostrarResumenReceta() {
    let receta = " Ravioles";
    let tiempo = calcularTiempoTotal(30, 45, 15); 
    let porciones = 4;

    console.log("Resumen de receta:");
    console.log(`La receta toma ${tiempo} ${unidad} y rinde para ${porciones} personas.`);
}

//-----------------------------------------------------
//6.- Invocación de funciones
//-----------------------------------------------------
    let tiempoPasta = calcularTiempoTotal(10, 30, 5);
    let ingredientesPasta = calcularPorciones(2, 3);
    console.log("Tiempo para pasta:", tiempoPasta, unidad);
    console.log("Ingredientes para pasta:", ingredientesPasta);

//-----------------------------------------------------
//7.- Alcance de las variables locales
//-----------------------------------------------------
    function pasosReceta() {
        let instrucciones = "1. Hervir agua. 2. Colocar Espagueti. 3. Cocinar. 4. Dejar reposar.";
        console.log("Pasos dentro de la función:", instrucciones);
    }

    pasosReceta();

    //console.log(instrucciones); // descomentar para ver el error al ejecutar
    // ReferenceError: instrucciones is not defined
    // Instrucciones es una variable local y no se puede acceder fuera de la función.

//-----------------------------------------------------
//8.- El problema de las variables globales
//-----------------------------------------------------
    let nivelDeDificultad = "fácil";
        function cambiarDificultad() {
        nivelDeDificultad = "difícil"; 
        console.log("Dificultad dentro de la función:", nivelDeDificultad);
    }

    console.log("Dificultad antes:", nivelDeDificultad); 
    cambiarDificultad();
    console.log("Dificultad después:", nivelDeDificultad); 

    //Discutan cómo esto puede afectar programas más grandes.
    //El cambio del contenido de la variable puede generar errores, si otra parte del código
    //utiliza lo que afectaría el resultado de alguna operación.

//-----------------------------------------------------
//9.- Función anidada
//-----------------------------------------------------
    function gestionarReceta(nombreReceta, tiempoTotal, totalIngredientes) {
        function imprimirDetalles() {
            console.log(`Para preparar ${nombreReceta} necesitarás ${tiempoTotal} minutos en total y ${totalIngredientes} ingredientes.`);
        }
        imprimirDetalles();
    }

    gestionarReceta("Ravioles", 40, 8);
