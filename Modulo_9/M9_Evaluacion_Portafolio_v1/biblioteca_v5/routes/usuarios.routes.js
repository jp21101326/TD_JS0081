import { Router } from "express";
import { registrarUsuario, listarUsuarios, eliminarUsuario } from "../controllers/usuarios.controller.js";

const router = Router();

router.get("/register", (req, res) => res.render("register"));
router.post("/register", registrarUsuario);

router.get("/", listarUsuarios);
router.delete("/:id", eliminarUsuario);

export default router;
