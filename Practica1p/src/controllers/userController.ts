import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AuthRequest } from '../types/express';


// Función para registrar un nuevo usuario
export const registerUser = async (req: AuthRequest, res: Response) => {
  const { nombre, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
       res.status(400).json({ message: 'El usuario ya existe' });
       return;}

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = new User({
      nombre,
      email,
      password: hashedPassword
    });

    // Guardar el usuario
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Función para iniciar sesión
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
       res.status(400).json({ message: 'Usuario no encontrado' });
       return;}

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       res.status(400).json({ message: 'Contraseña incorrecta' });
      return;}

    // Crear el token de autenticación (JWT)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
