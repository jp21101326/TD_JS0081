function convertirTemperatura(temp, unidad) {
    if (unidad === 'c') {
        return (temp * 9/5) + 32; // Celsius → Fahrenheit (F)
    } else if (unidad === 'f') {
        return (temp - 32) * 5/9; // Fahrenheit → Celsius (C)
    } else {
        console.log('----------------------------------------------------');
        console.log(chalk.red('Unidad inválida. Usa "c" para Celsius o "f" para Fahrenheit.'));
        console.log('----------------------------------------------------');
    }
}

module.exports = { convertirTemperatura };
