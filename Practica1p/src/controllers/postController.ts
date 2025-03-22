import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { User } from '../models/User';
import { AuthRequest } from '../types/express';

// Función para crear una nueva publicación
export const createPost = async (req: AuthRequest, res: Response) => {
  const { titulo, contenido } = req.body;

  try {
    // Obtener el usuario logueado desde req.user (esto lo resolveremos después con el middleware)
    const userId = req.user?.id;

    if (!userId) {
       res.status(401).json({ message: 'No autorizado' });
    return;}

    // Crear una nueva publicación
    const newPost = new Post({
      titulo,
      contenido,
      autor: userId
    });

    // Guardar la publicación
    await newPost.save();

    res.status(201).json({ message: 'Publicación creada', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Función para obtener todas las publicaciones
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate('autor', 'nombre email'); // Poblamos los datos del autor

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
