
import { Router } from "express";
import { registerView, register, loginView, login, logout, apiLogin } from "../controllers/auth.controller.js";

const router = Router();

router.get("/register", registerView);
router.post("/register", register);

router.get("/login", loginView);
router.post("/login", login);

// API login for Postman
router.post("/api/login", apiLogin);

router.get("/logout", logout);

export default router;
