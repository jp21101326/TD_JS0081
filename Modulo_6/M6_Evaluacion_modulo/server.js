const express = require('express');
const fs = require('fs').promises; // Usamos fs.promises para trabajar con async/await
const path = require('path');

const app = express();
const PORT = 3000;
const CONTACTOS_FILE = path.join(__dirname, 'data', 'contactos.json');

// --- Configuración de Express ---
// 1. Motor de Plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. Middleware para parsear datos de formularios (req.body)
app.use(express.urlencoded({ extended: true }));

// 3. Servir contenido estático (Fase 2)
 app.use(express.static(path.join(__dirname, 'public'))); 
// Comentado para mantenerlo simple, pero así se haría.

// --- Funciones de Persistencia (Fase 3) ---

/** Lee los contactos desde el archivo JSON */
async function leerContactos() {
    try {
        const data = await fs.readFile(CONTACTOS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Manejo de error si el archivo no existe o está corrupto
        console.error('Error al leer el archivo de contactos:', error.message);
        return [];
    }
}

/** Escribe el array de contactos en el archivo JSON */
async function escribirContactos(contactos) {
    try {
        await fs.writeFile(CONTACTOS_FILE, JSON.stringify(contactos, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error al escribir en el archivo de contactos:', error.message);
        throw new Error('No se pudo guardar la información de contacto.');
    }
}

// --- Rutas (Fase 2 y 4) ---

// 1. Ruta GET para listar contactos (Página principal)
app.get('/', async (req, res, next) => {
    try {
        const contactos = await leerContactos();
        const mensaje = req.query.msg || null;
        // A la vista principal le pasamos los contactos Y el título
        res.render('index', { 
            titulo: 'Agenda de Contactos', // Variable 'titulo' ahora disponible
            contactos: contactos,
            mensaje 
        });
    } catch (error) {
        next(error);
    }
});

// 2. Ruta GET para mostrar el formulario de agregar
app.get('/agregar', (req, res) => {
    res.render('agregar', { titulo: 'Agregar Contacto' });
});

// 3. Ruta POST para agregar un nuevo contacto
app.post('/agregar', async (req, res, next) => {
    try {
        const contactos = await leerContactos();
        const nuevoId = siguienteId(contactos); 
        const nuevoContacto = {
            // Genera un ID único simple (mejor usar librerías como uuid en prod)
            id: String(nuevoId),
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            email: req.body.email
        };

        contactos.push(nuevoContacto);
        await escribirContactos(contactos);
        res.redirect('/?msg=agregado'); // Redirige a la lista principal
    } catch (error) {
        next(error);
    }
});

// 4. Ruta GET para mostrar el formulario de edición
app.get('/editar/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const contactos = await leerContactos();
        const contacto = contactos.find(c => c.id === id);

        if (!contacto) {
            return res.status(404).send('Contacto no encontrado');
        }

        res.render('editar', { titulo: 'Editar Contacto', contacto });
    } catch (error) {
        next(error);
    }
});

// 5. Ruta POST para actualizar un contacto
app.post('/editar/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const contactos = await leerContactos();
        const index = contactos.findIndex(c => c.id === id);

        if (index === -1) {
            return res.status(404).send('Contacto no encontrado para actualizar');
        }

        // Actualiza los datos
        contactos[index] = {
            id: id,
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            email: req.body.email
        };

        await escribirContactos(contactos);
        res.redirect('/?msg=editado');
    } catch (error) {
        next(error);
    }
});

// 6. Ruta POST (o GET) para eliminar un contacto
app.get('/eliminar/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        let contactos = await leerContactos();
        
        // Filtra para dejar fuera el contacto con el ID a eliminar
        contactos = contactos.filter(c => c.id !== id); 

        await escribirContactos(contactos);
        res.redirect('/?msg=eliminado');
    } catch (error) {
        next(error);
    }
});

// --- Middleware de Manejo de Errores (Fase 5) ---
// Debe ser el último middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Muestra la traza en la consola del servidor
    res.status(500).render('error', { 
        titulo: 'Error', 
        mensaje: 'Ocurrió un error inesperado.', 
        error: err.message // Puedes mostrar un mensaje más específico si quieres
    });
});

function siguienteId(contactos) {
    if (contactos.length === 0) {
        return 1; // Si no hay contactos, empieza en 1
    }
    const idsNumericos = contactos.map(c => parseInt(c.id)).filter(id => !isNaN(id));
    if (idsNumericos.length === 0) {
        return 1; 
    }
    const maxId = Math.max(...idsNumericos);
    return maxId + 1;
}


// --- Iniciar Servidor ---
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
    console.log(`Para desarrollo, usa 'npm run dev'`);
});