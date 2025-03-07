import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secreto";

export const login = (req: Request, res: Response) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ message: "Correo y contraseña son requeridos" });
  }

  const token = jwt.sign({ correo, contraseña }, SECRET_KEY, { expiresIn: "1h" });

  res.status(200).json({ token });
};