import { Router } from "express";
import {
  listarLibros,
  mostrarLibroComprar,
  comprarLibro,
  mostrarFormularioCrear,
  crearLibroController,
  eliminarLibro,
  editarLibroVista,
  actualizarLibro
} from "../controllers/libros.controller.js";

import { verificarToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", listarLibros);

router.get("/crear", mostrarFormularioCrear);
router.post("/crear", crearLibroController);

router.get("/:id/editar", editarLibroVista);
router.post("/:id/editar", actualizarLibro);

router.get("/:id/comprar", verificarToken, mostrarLibroComprar);
router.post("/:id/comprar", verificarToken, comprarLibro);

router.get("/:id/eliminar", eliminarLibro);

export default router;
