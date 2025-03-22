import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types/express';


// Interfaz para el payload del JWT (agregamos el id del usuario)
interface JwtPayload {
  userId: string;
}

// Middleware para verificar el token JWT
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Obtener el token del encabezado Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Si no hay token, respondemos con un error de autenticación
  if (!token) {
     res.status(401).json({ message: 'No autorizado, token no proporcionado' });
     return}

  try {
    // Verificamos y decodificamos el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Asignamos el id del usuario al objeto req.user
    req.user = { id: decoded.userId };

    // Continuamos con la siguiente función
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
