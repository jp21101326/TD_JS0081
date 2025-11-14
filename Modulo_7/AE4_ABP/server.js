const fs = require('fs/promises');
const Tienda = require('./models/tienda');

const main = async () => {
  // ÉXITO
  await Tienda.realizarCompra('Ana Torres', 'ana.torres@example.com', 1, 2);

  // ERROR POR STOCK INSUFICIENTE
  await Tienda.realizarCompra('Carlos Vega', 'carlos.vega@example.com', 3, 9999);

  // ERROR POR PRODUCTO INEXISTENTE
  await Tienda.realizarCompra('Luis Test', 'luis.test@example.com', 999, 1);
};

main();

// Captura de errores globales
process.on('uncaughtException', async (err) => {
  console.error('Error no controlado:', err.message);
  const logs = JSON.parse(await fs.readFile('./logs.json', 'utf-8').catch(() => '[]'));
  logs.push({ error: err.message, timestamp: new Date() });
  await fs.writeFile('./logs.json', JSON.stringify(logs, null, 2));
});
