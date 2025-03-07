import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secreto";

declare module "express" {
  interface Request {
    user?: any;
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado." });
  }
};