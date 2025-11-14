import express from "express";
import { validarItemMdw } from "../middleware/validacionMiddleware.js";
import { verItems, crearItem, modificarItem, borrarItem } from "../controllers/itemsController.js";

// Crear Router
export const routerItems = express.Router();

// Middleware recibir JSON en req
routerItems.use(express.json());

//Rutas
routerItems.route('/')
    .get(verItems)
    .post(validarItemMdw, crearItem);

routerItems.route('/:id')
    .put(validarItemMdw, modificarItem)
    .delete(borrarItem);
