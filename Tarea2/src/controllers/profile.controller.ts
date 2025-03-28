import { Request, Response } from "express";

export const getProfile = (req: Request, res: Response) => {
  const user = req.user;

  /*checar por que no me jalba el user y el token*/

  res.status(200).json({ message: "Perfil del usuario", user });
};