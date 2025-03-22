import { Router } from 'express';
import { createPost, getPosts } from '../controllers/postController';

const router = Router();

// Ruta para crear una nueva publicación
router.post('/', createPost);

// Ruta para obtener todas las publicaciones
router.get('/', getPosts);

export default router;
