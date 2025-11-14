class Libro {
  constructor(titulo, autor, anioPublicacion, isbn) {
    this.titulo = titulo;
    this.autor = autor;
    this.anioPublicacion = anioPublicacion;
    this.isbn = isbn;
  }

  // Métodos personalizados
  mostrarDetalles() {
    console.table(this);
  }

  // Getters y Setters
  get getTitulo() {
    return this.titulo;
  }

  set setTitulo(nuevoTitulo) {
    if (!nuevoTitulo || nuevoTitulo.length < 2) {
      console.error('El título debe tener al menos 2 caracteres.');
      return;
    }
    this.titulo = nuevoTitulo;
  }

  actualizarAnio(nuevoAnio) {
    if (isNaN(nuevoAnio) || nuevoAnio < 0) {
      console.error('El año debe ser un número válido.');
      return;
    }
    this.anioPublicacion = nuevoAnio;
  }
}

// Instanciación de prueba
const libro1 = new Libro('1984', 'George Orwell', 1949, '9780451524935');
const libro2 = new Libro('Cien Años de Soledad', 'Gabriel García Márquez', 1967, '9780307474728');

libro1.mostrarDetalles();
libro2.mostrarDetalles();

libro1.setTitulo = 'Rebelión en la Granja';
libro1.mostrarDetalles();

module.exports = Libro;
