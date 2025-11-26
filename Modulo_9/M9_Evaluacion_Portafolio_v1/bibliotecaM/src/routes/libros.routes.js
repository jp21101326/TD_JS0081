import { Router } from 'express';
import { listarLibros, comprarLibro } from '../controllers/libros.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/libros', listarLibros);
router.post('/libros/:id/comprar', verifyToken, comprarLibro);

export default router;
