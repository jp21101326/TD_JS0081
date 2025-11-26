import { Router } from "express";
import { login } from "../controllers/auth.controller.js";

const router = Router();

router.get("/login", (req, res) => res.render("login"));
router.post("/login", login);

export default router;
