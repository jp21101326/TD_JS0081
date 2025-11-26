import { getLibros, guardarLibros, crearLibro } from "../models/book.model.js";

export const listarLibros = (req, res) => {
  const libros = getLibros();
  res.render("libros", { libros });
};

export const mostrarFormularioCrear = (req, res) => {
  res.render("crearLibro");
};

export const crearLibroController = (req, res) => {
  const { nombre, cantidad_disponible } = req.body;

  crearLibro({
    nombre,
    cantidad_disponible: Number(cantidad_disponible)
  });

  res.redirect("/libros");
};

export const mostrarLibroComprar = (req, res) => {
  const { id } = req.params;
  const libros = getLibros();
  const libro = libros.find(l => l.id == id);

  res.render("comprar", { libro });
};

export const comprarLibro = (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;

  const libros = getLibros();
  const libro = libros.find(l => l.id == id);

  if (!libro) {
    return res.render("comprar", { error: "Libro no existe" });
  }

  const cantidadSolicitada = Number(cantidad);

  if (cantidadSolicitada > libro.cantidad_disponible) {
    return res.render("comprar", {
      libro,
      error: "No hay stock suficiente"
    });
  }

  libro.cantidad_disponible -= cantidadSolicitada;
  guardarLibros(libros);

  return res.render("comprar", {
    libro,
    success: "Compra realizada correctamente"
  });
};

export const eliminarLibro = (req, res) => {
  const { id } = req.params;

  let libros = getLibros();
  libros = libros.filter(l => l.id != id);
  guardarLibros(libros);

  res.redirect("/libros");
};

export const editarLibroVista = (req, res) => {
  const { id } = req.params;
  const libros = getLibros();
  const libro = libros.find(l => l.id == id);

  res.render("editarLibro", { libro });
};

export const actualizarLibro = (req, res) => {
  const { id } = req.params;
  const { nombre, cantidad_disponible } = req.body;

  const libros = getLibros();
  const libro = libros.find(l => l.id == id);

  libro.nombre = nombre;
  libro.cantidad_disponible = Number(cantidad_disponible);

  guardarLibros(libros);

  res.redirect("/libros");
};
