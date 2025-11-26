import { getLibros, saveLibros } from '../models/libro.model.js';
import fs from 'fs';
import path from 'path';

const ventasFile = path.resolve('src/models/ventas.json');

const readVentas = () => {
  try { return JSON.parse(fs.readFileSync(ventasFile, 'utf-8')); }
  catch { return []; }
};
const saveVentas = (v) => fs.writeFileSync(ventasFile, JSON.stringify(v, null, 2));

export const dashboard = (req, res) => {
  const libros = getLibros();
  const ventas = readVentas();
  const totalLibros = libros.length;
  const totalVentas = ventas.length; // o sumar cantidades
  const sinStock = libros.filter(l => l.cantidad_disponible === 0).length;
  res.render('admin/dashboard', { totalLibros, totalVentas, sinStock, libros });
};

export const newLibroForm = (req, res) => res.render('admin/new');
export const createLibro = (req, res) => {
  const libros = getLibros();
  const { nombre, precio, cantidad } = req.body;
  const id = libros.length ? libros[libros.length-1].id + 1 : 1;
  libros.push({ id, nombre, cantidad_disponible: Number(cantidad), precio: Number(precio) });
  saveLibros(libros);
  res.redirect('/admin');
};

// Agregar edit / update / delete similar...
