//IMPORTACIONES
import express from 'express'; // Es para el servidor
import hbs from 'hbs';  // Es para las plantillas
import path from 'path';    // Es para las rutas de los archivos

//CONFIGURACIONES
const app = express(); // Inicializo express
const port = 8080; // Puerto

// Carpeta public para los archivos estáticos
app.use(express.static('public'));

// Le digo que voy a usar handlebars, donde van a estar las vistas y las vistas parciales
app.set('view engine', 'hbs');
app.set('views', path.join(path.dirname(''), 'views'));
hbs.registerPartials(path.join(path.dirname(''), 'views/partials'));

//helpers
hbs.registerHelper('mayusculas', (texto) => {
    return texto.toUpperCase();
});
hbs.registerHelper('anioActual', () => {
  return new Date().getFullYear();
});

//PROCESOS
const proyectos = [
  { id: 1, nombre: 'Full Stack',       descripcion: 'Aplicación web personal donde integro frontend y backend para mostrar mis proyectos y habilidades.', tecnologias: 'HTML, CSS, JS' ,       image:'/img/javascript2.jpg'},
  { id: 2, nombre: 'SQL Server',       descripcion: 'Sistema de gestión de datos con procedimientos almacenados y consultas optimizadas para reportes.',  tecnologias: 'SQL Server, T-SQL',    image:'/img/sql_server2.png'},
  { id: 3, nombre: 'Visual Stucio C#', descripcion: 'Aplicación de web de prueba para inventario y control de productos..',                               tecnologias: 'C#, .NET, SQL Server', image:'/img/informatica.jpg'},
  { id: 4, nombre: 'Configuración de Servidores', descripcion: 'Demostración de configuración de servidores Windows y Linux, manejo de dominios y control de usuarios.', tecnologias: 'Windows Server, Linux, Active Directory', image:'/img/servidores.jpg'},
  { id: 5, nombre: 'Redes y Routers',    descripcion: 'Simulación de configuración de routers, VLANs y redes locales para pequeñas empresas.',                           tecnologias: 'Cisco Packet Tracer, RouterOS, TCP/IP',   image:'/img/router.jpg'},
  { id: 6, nombre: 'Microsoft Avanzado', descripcion: 'Automatización y gestión de tareas usando Excel avanzado, PowerShell y herramientas de Microsoft 365.',           tecnologias: 'Excel, PowerShell, Microsoft 365',        image:'/img/microsoft.jpeg'}

];

//rutas
app.get('/', (req, res) => {
    res.render('home', {
        ruta: '/',
        title: 'Inicio - Mi Portafolio',
        mi_nombre: 'Juan Pizarro C.',
        layout:'layouts/main',
        descripcion: 'Soy un desarrollador entusiasta al que le gustan los desafíos y la programación. Tengo experiencia en C# con Visual Studio, PHP, MySQL y SQL Server. Me adapto fácilmente a los equipos de trabajo, disfruto aprender nuevas tecnologías e innovar en cada proyecto en el que participo.',
        proyectos: proyectos.slice(0, 3) 
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Acerca de - Mi Portafolio',
        mi_nombre: 'Juan Pizarro C.',
        layout:'layouts/main',
        descripcion: 'Desarrollador Full Stack con pasión por crear soluciones tecnológicas innovadoras'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', {
        title: 'Proyectos - Mi Portafolio',
        mi_nombre: 'Juan Pizarro C.',
        layout:'layouts/main',
        descripcion: 'Aquí puedes ver algunos de mis proyectos más destacados.',
        proyectos: proyectos
    });
});

app.use((req, res) => {
  res.status(404).render('404', {
    layout:'layouts/main',
    title: '404 - Página no encontrada',
    mensaje: 'La página que estás buscando no existe o ha sido movida a otro lugar.'
  });
});

//SERVIDOR
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});