// IMPORTACIONES
const yargs = require('yargs');
const chalk = require('chalk');
const { convertirTemperatura } = require('./helpers/convert.js');

// Configuración de argumentos con Yargs
const argv = yargs
    .option('temp', {
        alias: 't',
        describe: 'Valor numérico de la temperatura a convertir',
        demandOption: true,
        type: 'number',
    })
    .option('unidad', {
        alias: 'u',
        describe: 'Unidad de la temperatura: c (Celsius) o f (Fahrenheit)',
        demandOption: true,
        type: 'string',
    })
    .check((argv) => {
        if (isNaN(argv.temp)) {
             console.log('----------------------------------------------------');
             console.log(chalk.red('El parámetro --temp debe ser un número.'));
             console.log('----------------------------------------------------');
             process.exit(1); 
        }
        if (!['c', 'f'].includes(argv.unidad.toLowerCase())) {
            console.log('----------------------------------------------------');
            console.log(chalk.yellow('Atención: la unidad debe ser "c" o "f".'));
            console.log('----------------------------------------------------');
            process.exit(1); 
        }
        
        return true;
    })
    .fail((msg, err, yargs) => {
        console.log('----------------------------------------------------');
        console.log(chalk.red('Error: Debes ingresar los parámetros --temp y --unidad.'));
        console.log('Ejemplo: node server.js --temp=100 --unidad=c');
        console.log('----------------------------------------------------');
        process.exit(1);
    })
    .argv;

// Ejecución de la conversión
try {
    const resultado = convertirTemperatura(argv.temp, argv.unidad.toLowerCase());

    if (argv.unidad.toLowerCase() === 'c') {
         console.log('----------------------------------------------------');
         console.log(chalk.green(`Resultado: ${argv.temp}°C equivalen a ${resultado.toFixed(2)}°F`));
         console.log('----------------------------------------------------');
    } else {
         console.log('----------------------------------------------------');
         console.log(chalk.green(`Resultado: ${argv.temp}°F equivalen a ${resultado.toFixed(2)}°C`));
         console.log('----------------------------------------------------');
    }

} catch (error) {
     console.log('----------------------------------------------------');
     console.log(chalk.red('Error: ' + error.message));
     console.log('----------------------------------------------------');
     process.exit(1);

     
}
