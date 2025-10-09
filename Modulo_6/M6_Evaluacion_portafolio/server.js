const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const chalk = require('chalk');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Archivo de productos
const filePath = path.join(__dirname, 'productos.json');

// Ruta raíz
app.get('/', (req, res) => {
    res.render('index', { titulo: "¡Bienvenido a la tienda en línea!" });
});

// Ruta para listar productos
app.get('/productos', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(chalk.red("Error al leer productos:", err.message));
            return res.status(500).send("Error al leer productos");
        }
        const productos = JSON.parse(data || "[]");
        res.render('productos', { productos });
    });
});

// Ruta para formulario de agregar producto
app.post('/productos', (req, res) => {
    const { nombre, descripcion, precio } = req.body;

    if (!nombre || !descripcion || !precio) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        let productos = [];
        if (!err && data) {
            productos = JSON.parse(data);
        }

        const nuevoProducto = {
            id: productos.length + 1,
            nombre,
            descripcion,
            precio: parseFloat(precio)
        };

        productos.push(nuevoProducto);

        fs.writeFile(filePath, JSON.stringify(productos, null, 2), (err) => {
            if (err) {
                console.error(chalk.red("Error al guardar producto:", err.message));
                return res.status(500).send("Error al guardar producto");
            }
            console.log(chalk.green("Producto agregado con éxito"));
            res.redirect('/productos');
        });
    });
});

// Middleware de rutas inexistentes
app.use((req, res) => {
    res.status(404).render('error', { mensaje: "Página no encontrada (404)" });
});

// Middleware de errores generales
app.use((err, req, res, next) => {
    console.error(chalk.red("Error interno:", err.message));
    res.status(500).render('error', { mensaje: "Error interno del servidor (500)" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(chalk.blue(`Servidor corriendo en http://localhost:${PORT}`));
});
