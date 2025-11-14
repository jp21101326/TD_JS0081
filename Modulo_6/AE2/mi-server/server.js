const express = require('express');
const app = express();
const PORT = 3000;

// Ruta raíz "/"
app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi servidor Express! Soy Juan P.');
});

// Ruta "/saludo"
app.get('/saludo', (req, res) => {
  res.send('Hola, espero que tengas un excelente día 😀');
});

// Ruta "/hora"
app.get('/hora', (req, res) => {
  const horaActual = new Date().toLocaleTimeString();
  res.send(`La hora actual del sistema es: ${horaActual}`);
});

// Ruta "/despedida"
app.get('/despedida', (req, res) => {
  res.send('¡Gracias por visitar mi servidor, hasta pronto! 👋');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
